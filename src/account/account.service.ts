import {
  ConflictException,
  NotFoundException,
  Injectable,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthService } from "src/auth/auth.service";
import { Connection, Repository, UpdateResult } from "typeorm";
import { CreateAccountDto } from "./dto/account.create-dto";
import { UpdateAccountDto } from "./dto/account.update-dto";
import { AccountEntity } from "./entity/account.entity";

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(AccountEntity)
    private AccountRepository: Repository<AccountEntity>,
    private authService: AuthService,
    private connection: Connection
  ) {}

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
    const findAccount: AccountEntity = await this.AccountRepository.findOne({
      email,
    });
    if (findAccount)
      throw new ConflictException(
        `${email} is already created Account. Create another Account.`
      );
    return this.AccountRepository.save({
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
    });
  }

  async findAll(): Promise<AccountEntity[]> {
    return await this.AccountRepository.find({ relations: ["address"] });
  }

  async findAccountById(id: number): Promise<AccountEntity> {
    const selectedAccount: AccountEntity = await this.AccountRepository.findOne(
      { id },
      { relations: ["address"] }
    );
    if (!selectedAccount)
      throw new NotFoundException(`there is no Account with ID ${id}`);
    return selectedAccount;
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
  ): Promise<UpdateResult> {
    return await this.AccountRepository.update(AccountId, updateAccountDto);
  }

  async removeAccountById(AccountId: number): Promise<void> {
    const Account: AccountEntity = await this.findAccountById(AccountId);
    await this.AccountRepository.delete(AccountId);
  }
}
