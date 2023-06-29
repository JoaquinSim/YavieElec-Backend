import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as Bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { UsuarioEntity } from '@auth/entities';
import { PayloadTokenModel } from '@auth/models';
import { RepositoryEnum } from '@shared/enums';
import {
  LoginDto,
  PasswordChangeDto,
  ReadProfileDto,
  ReadUserInformationDto,
  UpdateProfileDto,
  UpdateUserInformationDto,
} from '@auth/dto';
import { ServiceResponseHttpModel } from '@shared/models';
import { UsersService } from '@auth/services';

@Injectable()
export class AuthService {
  constructor(
    @Inject(RepositoryEnum.USUARIO_REPOSITORY)
    private repository: Repository<UsuarioEntity>,
    private jwtService: JwtService,
  ) {}

  async changePassword(id: string, payload: PasswordChangeDto) {
    const user = await this.repository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isMatchPassword = await this.checkPassword(payload.oldPassword, user);

    if (!isMatchPassword) {
      throw new BadRequestException('The old password is not match.');
    }

    if (payload.confirmationPassword !== payload.newPassword) {
      throw new BadRequestException('The passwords do not match.');
    }

    user.clave = payload.newPassword;

    await this.repository.save(user);

    return { data: true };
  }

  async login(payload: LoginDto) {
    const user = await this.findByCorreo(payload.correo);

    // if (user && user.maxAttempts === 0)
    //   throw new UnauthorizedException(
    //     'User exceeded the maximum number of attempts allowed.',
    //   );

    // if (user && user.suspendedAt)
    //   throw new UnauthorizedException('User is suspended.');

    if (!user || !(await this.checkPassword(payload.clave, user))) {
      throw new UnauthorizedException('Wrong username and/or password.');
    }

   // user.activatedAt = new Date();
    const { clave, ...userRest } = user;

    await this.repository.update(userRest.id, userRest);

    const accessToken = this.generateJwt(user);

    return { data: { accessToken, user } };
  }

  // async findProfile(id: string): Promise<ServiceResponseHttpModel> {
  //   const user = await this.repository.findOne({
  //     where: { id },
  //     relations: {
  //       bloodType: true,
  //       ethnicOrigin: true,
  //       identificationType: true,
  //       gender: true,
  //       maritalStatus: true,
  //       sex: true,
  //     },
  //   });

  //   if (!user) {
  //     throw new NotFoundException('User not found');
  //   }

  //   return { data: plainToInstance(ReadProfileDto, user) };
  // }

  // async findUserInformation(id: string): Promise<ServiceResponseHttpModel> {
  //   const user = await this.repository.findOneBy({ id });

  //   if (!user) {
  //     throw new NotFoundException('User not found');
  //   }

  //   return { data: plainToInstance(ReadUserInformationDto, user) };
  // }

  // async updateUserInformation(
  //   id: string,
  //   payload: UpdateUserInformationDto,
  // ): Promise<ServiceResponseHttpModel> {
  //   const user = (await this.userService.findOne(id)).data as UsuarioEntity;

  //   if (!user) {
  //     throw new NotFoundException('User not found');
  //   }

  //   this.repository.merge(user, payload);
  //   const userUpdated = await this.repository.save(user);

  //   return { data: plainToInstance(ReadUserInformationDto, userUpdated) };
  // }

  // async updateProfile(
  //   id: string,
  //   payload: UpdateProfileDto,
  // ): Promise<ServiceResponseHttpModel> {
  //   const user = await this.repository.findOneBy({ id });

  //   if (!user) {
  //     throw new NotFoundException('User not found');
  //   }

  //   this.repository.merge(user, payload);

  //   const profileUpdated = await this.repository.save(user);

  //   return { data: plainToInstance(ReadProfileDto, profileUpdated) };
  // }

  refreshToken(user: UsuarioEntity) {
    const accessToken = this.generateJwt(user);

    return { data: { accessToken, user } };
  }

  private generateJwt(user: UsuarioEntity) {
    const payload: PayloadTokenModel = { id: user.id, role: 'admin' };

    return this.jwtService.sign(payload);
  }

  private async findByCorreo(correo: string): Promise<UsuarioEntity> {
    return (await this.repository.findOne({
      where: {
        correo,
      },
    })) as UsuarioEntity;
  }

  private async checkPassword(passwordCompare: string, user: UsuarioEntity) {
    const { clave, ...userRest } = user;
    const isMatch = Bcrypt.compareSync(passwordCompare, clave);

    if (isMatch) {
     // userRest.maxAttempts = 3;
      await this.repository.save(userRest);
      return user;
    }

   // userRest.maxAttempts =
     // userRest.maxAttempts > 0 ? userRest.maxAttempts - 1 : 0;
    await this.repository.save(userRest);

    return null;
  }
}
