import {
  ConflictException,
  NotFoundException,
  Injectable,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AccountEntity } from "src/account/entity/account.entity";
import { AuthService } from "src/auth/auth.service";
import { Connection, Repository, UpdateResult } from "typeorm";
import { CreateUserDto } from "./dto/user.create-dto";
import { LoginUserDto } from "./dto/user.login-dto";
import { UpdateUserDto } from "./dto/user.update-dto";
import { BlockJwtEntity } from "./entity/block.jwt.entity";
import { UserEntity } from "./entity/user.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(AccountEntity)
    private AccountRepository: Repository<AccountEntity>,
    @InjectRepository(BlockJwtEntity)
    private bJwtRepository: Repository<BlockJwtEntity>,
    private authService: AuthService,
    private connection: Connection,
  ) { }

  async createUser(user: CreateUserDto): Promise<UserEntity> {
    const {
      email,
      password,
      firstName,
      lastName,
      phone,
      isNotary,
      signature,
      accIds,
    } = user;
    const hashPassword: string = await this.authService.hashPassword(password);
    console.log(await this.AccountRepository.findByIds(accIds || []))
    return this.userRepository.save({
      email,
      firstName,
      lastName,
      phone,
      password: hashPassword,
      isNotary,
      signature,
      accounts: await this.AccountRepository.findByIds(accIds || [])
    });
  }

  async login(loginUser: UserEntity): Promise<LoginUserDto> {
    const accessToken: string = await this.authService.generateJWT(loginUser);
    return { accessToken };
  }

  async logout(auth: string): Promise<any> {
    const jwt = auth.replace('bearer ', '');
    const decodedJwt: any = this.authService.decodeJWT(jwt);

    if (!decodedJwt?.user?.id) return;
    await this.bJwtRepository.save({
      token: jwt,
      user: decodedJwt?.user
    })
    return {
      status: 'success'
    }
  }

  async createManyUser(users: CreateUserDto[]): Promise<void> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      for (const user of users) {
        await queryRunner.manager.save(user);
      }
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async findUserById(id: number): Promise<UserEntity> {
    const selectedUser: UserEntity = await this.userRepository.findOne({ id });
    if (!selectedUser)
      throw new NotFoundException(`there is no user with ID ${id}`);
    return selectedUser;
  }

  async findUserByEmail(email: string): Promise<UserEntity> {
    const selectedUser: UserEntity = await this.userRepository.findOne({
      email,
    });
    if (!selectedUser)
      throw new NotFoundException(`there is no user with email->(${email})`);
    return selectedUser;
  }

  async updateUserById(
    userId: number,
    updateUserDto: UpdateUserDto
  ): Promise<UpdateResult> {
    return await this.userRepository.update(userId, updateUserDto);
  }

  async removeUserById(userId: number): Promise<void> {
    const user: UserEntity = await this.findUserById(userId);
    await this.userRepository.delete(userId);
  }
}
