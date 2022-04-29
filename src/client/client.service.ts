import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { S3 } from 'aws-sdk';
import { CreateClientDto } from "./dto/client.create-dto";
import { ClientEntity } from "./entity/client.entity";
import { StateEntity } from "src/state/entity/state.entity";
import { plainToClass } from "class-transformer";
import { UpdateClientDto } from "./dto/client.update-dto";
import { AccountEntity } from "src/account/entity/account.entity";
import { KbaEntity } from "src/kba/entity/kba.entity";
import { TimezoneEntity } from "src/timezone/entity/timezone.entity";
import * as bcrypt from "bcrypt";
import { emptyS3Directory } from "src/providers/utils";

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(ClientEntity)
    private clientRepository: Repository<ClientEntity>,
    @InjectRepository(StateEntity)
    private StateRepository: Repository<StateEntity>,
    @InjectRepository(AccountEntity)
    private AccountRepository: Repository<AccountEntity>,
    @InjectRepository(KbaEntity)
    private kbaRepository: Repository<KbaEntity>,
    @InjectRepository(TimezoneEntity)
    private tzRepository: Repository<TimezoneEntity>,
  ) { }

  async findAllClients(): Promise<ClientEntity[]> {
    return await this.clientRepository.find({ relations: ["state", "billingState", "dlState", "accounts", "sessions"] });
  }

  async findClientById(id: number): Promise<ClientEntity> {
    return await this.clientRepository.findOne({ id }, { relations: ["state", "billingState", "dlState", "accounts", "sessions"] });
  }

  async createClient(client: CreateClientDto): Promise<ClientEntity> {
    const {
      ssn,
      state,
      billingState,
      dlState,
      accIds,
      kbas,
      tz,
      ...dto
    } = client;
    const s3 = new S3();
    const hashSSn: string = await bcrypt.hash(ssn, 12);
    const kbaEnts = await this.kbaRepository.save(kbas);

    const savedClient = await this.clientRepository.save(plainToClass(ClientEntity, {
      ssn: hashSSn,
      state: await this.StateRepository.findOne({
        id: state,
      }),
      billingState: await this.StateRepository.findOne({
        id: billingState,
      }),
      dlState: await this.StateRepository.findOne({
        id: dlState,
      }),
      accounts: await this.AccountRepository.findByIds(accIds || []),
      kbas: kbaEnts,
      timezone: await this.tzRepository.findOne(tz),
      ...dto,
    }));

    emptyS3Directory(`${savedClient.id}/`)
    const createFolderRes = await s3.upload({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: `${savedClient.id}/`,
      Body: ''
    }).promise();
    return savedClient;
  }

  async updateClientById(
    clientId: number,
    updateClientDto: UpdateClientDto
  ): Promise<ClientEntity> {
    const client = await this.clientRepository.findOne(clientId);
    if (!client)
      throw new NotFoundException(`there is no client with ID ${clientId}`);
    const {
      ssn,
      state,
      billingState,
      dlState,
      accIds,
      kbas,
      tz,
      ...dto
    } = updateClientDto;

    // if (dto?.email) {
    //   const findClient: ClientEntity = await this.clientRepository.findOne({
    //     email: dto.email,
    //   });
    //   if (findClient && findClient?.id !== clientId)
    //     throw new ConflictException(
    //       `${dto.email} already exists. Use another email.`
    //     );
    // }
    if (ssn) {
      dto['ssn'] = await bcrypt.hash(ssn, 12);
    }

    if (state) {
      dto['state'] = await this.StateRepository.findOne({ id: state })
    }

    if (billingState) {
      dto['billingState'] = await this.StateRepository.findOne({ id: billingState })
    }

    if (dlState) {
      dto['dlState'] = await this.StateRepository.findOne({ id: dlState })
    }

    if (accIds) {
      dto['accounts'] = await this.AccountRepository.findByIds(accIds || [])
    }

    if (kbas) {
      dto['kbas'] = await this.kbaRepository.save(kbas || []);
    }

    if (tz) {
      dto['timezone'] = await this.tzRepository.findOne(tz);
    }

    return await this.clientRepository.save(plainToClass(ClientEntity, { ...client, ...dto }));
  }

  async removeClientById(id: number): Promise<ClientEntity> {
    const client = await this.clientRepository.findOne(id);
    if (!client)
      throw new NotFoundException(`there is no client with ID ${id}`);
    emptyS3Directory(`${id}`)
    return await this.clientRepository.remove(client);
  }
}
