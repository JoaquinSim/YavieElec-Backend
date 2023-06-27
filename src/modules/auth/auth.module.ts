import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { config } from '@config';
import {
  AuthController,
  RolesController,
  TipoUsuarioController,
  UsersController,
  UsuarioController,
} from '@auth/controllers';
import {
  AuthService,
  MenusService,
  RolService,
  RolesService,
  TipoUsuarioService,
  UsersService,
  UsuariosService,
} from '@auth/services';
import { JwtStrategy } from '@auth/strategies';
import { authProviders } from '@auth/providers';
import { DatabaseModule } from '@database';
import { MenusController } from './controllers/menus.controller';

@Global()
@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        return {
          secret: configService.jwtSecret,
          signOptions: {
            expiresIn: '10d',
          },
        };
      },
    }),
  ],
  controllers: [
    AuthController,
    MenusController,
    RolesController,
    UsersController,

    //
    UsuarioController,
    TipoUsuarioController,
  ],
  providers: [
    ...authProviders,
    JwtStrategy,
    AuthService,
    RolesService,
    UsersService,
    MenusService,
    UsuariosService,
    TipoUsuarioService,
    RolService,
  ],
  exports: [
    UsersService,
    RolesService,
    MenusService,

    //
    UsuariosService,
    TipoUsuarioService,
    RolService,
  ],
})
export class AuthModule {}
