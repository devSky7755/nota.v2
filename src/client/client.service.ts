import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { CreateClientDto } from "./dto/client.create-dto";
import { ClientEntity } from "./entity/client.entity";
import { StateEntity } from "src/state/entity/state.entity";
import { plainToClass } from "class-transformer";
import { UpdateClientDto } from "./dto/client.update-dto";
import { AccountEntity } from "src/account/entity/account.entity";
import { KbaEntity } from "src/kba/entity/kba.entity";

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
  ) { }

  async findAllClients(): Promise<ClientEntity[]> {
    return await this.clientRepository.find({ relations: ["state", "billingState", "dlState", "accounts", "sessions"] });
  }

  async findClientById(id: number): Promise<ClientEntity> {
    return await this.clientRepository.findOne({ id }, { relations: ["state", "billingState", "dlState", "accounts", "sessions"] });
  }

  async createClient(client: CreateClientDto): Promise<ClientEntity> {
    const {
      state,
      billingState,
      dlState,
      accIds,
      kbas,
      ...dto
    } = client;

    const kbaEnts = await this.kbaRepository.save(kbas);

    return await this.clientRepository.save(plainToClass(ClientEntity, {
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
      ...dto,
    }));
  }

  async updateClientById(
    clientId: number,
    updateClientDto: UpdateClientDto
  ): Promise<ClientEntity> {
    const client = await this.clientRepository.findOne(clientId);
    if (!client)
      throw new NotFoundException(`there is no client with ID ${clientId}`);
    const {
      state,
      billingState,
      dlState,
      accIds,
      kbas,
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

    return await this.clientRepository.save(plainToClass(ClientEntity, { ...client, ...dto }));
  }

  async removeClientById(id: number): Promise<ClientEntity> {
    const client = await this.clientRepository.findOne(id);
    if (!client)
      throw new NotFoundException(`there is no client with ID ${id}`);
    return await this.clientRepository.remove(client);
  }
}
