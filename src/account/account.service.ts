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
    return await this.AccountRepository.find({ relations: ["state", "billingStates"] });
  }

  async findAccountById(id: number): Promise<AccountEntity> {
    const selectedAccount: AccountEntity = await this.AccountRepository.findOne(
      { id },
      { relations: ["state", "billingStates"] }
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
      billingStates,
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
      billingStates: await this.StateRepository.findByIds(billingStates)
    });
  }

  async findAccountByEmail(email: string): Promise<AccountEntity> {
    const selectedAccount: AccountEntity = await this.AccountRepository.findOne(
      { email },
      { relations: ["address"] }
    );
    if (!selectedAccount)
      throw new NotFoundException(`there is no Account with email->(${email})`);
    return selectedAccount;
  }

  async updateAccountById(
    AccountId: number,
    updateAccountDto: UpdateAccountDto
  ): Promise<any> {
    const { state, billingStates, ...dto } = updateAccountDto;
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

    if (billingStates && billingStates.length > 0) {
      dto['billingStates'] = await this.StateRepository.findByIds(billingStates)
    }
    const account = await this.AccountRepository.findOne(AccountId);
    return await this.AccountRepository.save(plainToClass(AccountEntity, { ...account, ...dto }));
  }

  async removeAccountById(AccountId: number): Promise<DeleteResult> {
    return await this.AccountRepository.delete(AccountId);
  }
}
