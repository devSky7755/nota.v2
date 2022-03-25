import {
  ConflictException,
  NotFoundException,
  Injectable,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthService } from "src/auth/auth.service";
import { StateEntity } from "src/state/entity/state.entity";
import { Connection, DeleteResult, Repository, UpdateResult } from "typeorm";
import { CreateAccountDto } from "./dto/account.create-dto";
import { UpdateAccountDto } from "./dto/account.update-dto";
import { AccountEntity } from "./entity/account.entity";
import { plainToClass } from 'class-transformer';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(AccountEntity)
    private AccountRepository: Repository<AccountEntity>,
    @InjectRepository(StateEntity)
    private StateRepository: Repository<StateEntity>,
    private authService: AuthService,
    private connection: Connection
  ) { }

  async findAll(): Promise<AccountEntity[]> {
    return await this.AccountRepository.find({ relations: ["state", "billingState"] });
  }

  async findAccountById(id: number): Promise<AccountEntity> {
    const selectedAccount: AccountEntity = await this.AccountRepository.findOne(
      { id },
      { relations: ["state", "billingState"] }
    );
    if (!selectedAccount)
      throw new NotFoundException(`there is no Account with ID ${id}`);
    return selectedAccount;
  }

  async createAccount(Account: CreateAccountDto): Promise<AccountEntity> {
    const {
      companyName,
      firstName,
      lastName,
      addressOne,
      addressTwo,
      city,
      state,
      zipCode,
      billingAddressOne,
      billingAddressTwo,
      billingCity,
      billingState,
      billingZipCode,
      email,
      billingEmail,
      phone,
      billingPhone,
      accountType,
      qbAccountNumber,
      brandColor,
      logo,
      whiteLabel,
      status,
      closedDate,
    } = Account;

    return await this.AccountRepository.save({
      companyName,
      firstName,
      lastName,
      addressOne,
      addressTwo,
      city,
      state: await this.StateRepository.findOne({
        id: state,
      }),
      zipCode,
      billingAddressOne,
      billingAddressTwo,
      billingCity,
      billingZipCode,
      email,
      billingEmail,
      phone,
      billingPhone,
      accountType,
      qbAccountNumber,
      brandColor,
      logo,
      whiteLabel,
      status,
      closedDate,
      billingState: await this.StateRepository.findOne({
        id: billingState,
      })
    });
  }

  async findAccountByEmail(email: string): Promise<AccountEntity> {
    const selectedAccount: AccountEntity = await this.AccountRepository.findOne(
      { email },
      { relations: ["state", "billingState"] }
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

    const { state, billingState, ...dto } = updateAccountDto;
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
    return await this.AccountRepository.save(plainToClass(AccountEntity, { ...account, ...dto }));
  }

  async removeAccountById(AccountId: number): Promise<DeleteResult> {
    return await this.AccountRepository.delete(AccountId);
  }
}
