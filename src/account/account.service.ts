import {
  ConflictException,
  NotFoundException,
  Injectable,
  BadRequestException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthService } from "src/auth/auth.service";
import { StateEntity } from "src/state/entity/state.entity";
import { Connection, DeleteResult, Repository, UpdateResult } from "typeorm";
import { CreateAccountDto } from "./dto/account.create-dto";
import { UpdateAccountDto } from "./dto/account.update-dto";
import { AccountEntity } from "./entity/account.entity";
import { plainToClass } from 'class-transformer';
import { AccTypeEntity } from "src/acc_type/entity/acc_type.entity";
import { QBService } from "src/quickbooks/quickbooks.service";
import { AccountStatusEntity } from "./entity/account.status.entity";
import { TimezoneEntity } from "src/timezone/entity/timezone.entity";

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(AccountEntity)
    private AccountRepository: Repository<AccountEntity>,
    @InjectRepository(StateEntity)
    private StateRepository: Repository<StateEntity>,
    @InjectRepository(AccTypeEntity)
    private AccTypeRepository: Repository<AccTypeEntity>,
    @InjectRepository(AccountStatusEntity)
    private AccStatusRepository: Repository<AccountStatusEntity>,
    @InjectRepository(TimezoneEntity)
    private tzRepository: Repository<TimezoneEntity>,
    private authService: AuthService,
    private connection: Connection,
    private qbService: QBService,
  ) { }

  async findAll(): Promise<AccountEntity[]> {
    return await this.AccountRepository.find({ relations: ["state", "billingState", "accType", "status"] });
  }

  async findAccountById(id: number): Promise<AccountEntity> {
    const selectedAccount: AccountEntity = await this.AccountRepository.findOne(
      { id },
      { relations: ["state", "billingState", "accType", "status"] }
    );
    if (!selectedAccount)
      throw new NotFoundException(`there is no Account with ID ${id}`);
    return selectedAccount;
  }

  async createAccount(Account: CreateAccountDto): Promise<AccountEntity | boolean> {
    const {
      state,
      billingState,
      accType,
      status,
      tz,
      ...dto
    } = Account;
    try {
      return await this.AccountRepository.save(plainToClass(AccountEntity, {
        state: await this.StateRepository.findOne({
          id: state,
        }),
        accType: await this.AccTypeRepository.findOne({
          id: accType,
        }),
        status: await this.AccStatusRepository.findOne({
          id: status,
        }),
        billingState: await this.StateRepository.findOne({
          id: billingState,
        }),
        timezone: await this.tzRepository.findOne(tz),
        ...dto
      }));
    } catch (error) {
      return false;
    }
  }

  async findAccountByEmail(email: string): Promise<AccountEntity> {
    const selectedAccount: AccountEntity = await this.AccountRepository.findOne(
      { email },
      { relations: ["state", "billingState", "accType"] }
    );
    if (!selectedAccount)
      throw new NotFoundException(`there is no Account with email->(${email})`);
    return selectedAccount;
  }

  async updateAccountById(
    AccountId: number,
    updateAccountDto: UpdateAccountDto
  ): Promise<AccountEntity> {
    const account = await this.AccountRepository.findOne(AccountId);
    if (!account)
      throw new NotFoundException(`there is no Account with ID ${AccountId}`);

    const {
      state,
      status,
      billingState,
      accType,
      tz,
      ...dto
    } = updateAccountDto;
    if (dto?.email) {
      const findAccount: AccountEntity = await this.AccountRepository.findOne({
        email: dto.email,
      });
      if (findAccount && findAccount?.id !== AccountId)
        throw new ConflictException(
          `${dto.email} already exists. Use another email.`
        );
    }

    if (state) {
      dto['state'] = await this.StateRepository.findOne({ id: state })
    }

    if (billingState) {
      dto['billingState'] = await this.StateRepository.findOne({ id: billingState })
    }

    if (accType) {
      dto['accType'] = await this.AccTypeRepository.findOne({ id: accType })
    }

    if (status) {
      dto['status'] = await this.AccStatusRepository.findOne({ id: status })
    }

    if (tz) {
      dto['timezone'] = await this.tzRepository.findOne(tz);
    }

    return await this.AccountRepository.save(plainToClass(AccountEntity, { ...account, ...dto }));
  }

  async removeAccountById(AccountId: number): Promise<AccountEntity> {
    const account = await this.AccountRepository.findOne(AccountId);
    if (!account)
      throw new NotFoundException(`there is no Account with ID ${AccountId}`);
    return await this.AccountRepository.remove(account);
  }
}
