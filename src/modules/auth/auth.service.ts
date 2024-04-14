import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { PrismaService } from 'src/orm/orm.service';
import { comparePasswordAndHash, generateFromPassword } from 'src/common';
import { SignInAuthDto, SignUpAuthDto } from './dto';
import { AuthTokens, JwtPayload } from './types';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpAuthDto: SignUpAuthDto) {
    const { email, firstName, lastName, age, gender, password, roles } =
      signUpAuthDto;

    const hashPassword = await generateFromPassword(password);

    const availableRoles = await this.prisma.role.findMany({
      where: {
        name: { in: roles },
      },
    });

    if (availableRoles.length === 0)
      throw new ForbiddenException('Access Denied');

    const user = await this.prisma.user
      .create({
        data: {
          firstName,
          lastName,
          age,
          gender,
          email,
          password: hashPassword,
          roles: {
            connect: availableRoles.map((role) => ({ id: role.id })),
          },
        },
        include: {
          roles: true,
        },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            throw new ForbiddenException('Credentials incorrect');
          }
        }
        throw error;
      });

    const rolesToken = user.roles.map((role) => role.name);

    const tokens = await this.getTokens(user.id, user.email, rolesToken);
    await this.updateRefreshTokenHash(user.id, tokens.refresh_token);

    return tokens;
  }

  async signIn(signInAuthDto: SignInAuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: signInAuthDto.email,
      },
      include: {
        roles: true,
      },
    });

    if (!user) throw new ForbiddenException('Access Denied');

    const passwordMatches = await comparePasswordAndHash(
      user.password,
      signInAuthDto.password,
    );

    if (!passwordMatches) throw new ForbiddenException('Access Denied');

    const roles = user.roles.map((role) => role.name);

    const tokens = await this.getTokens(user.id, user.email, roles);
    await this.updateRefreshTokenHash(user.id, tokens.refresh_token);

    return tokens;
  }

  async logout(userId: number): Promise<boolean> {
    await this.prisma.user.updateMany({
      where: {
        id: userId,
        refreshToken: {
          not: null,
        },
      },
      data: {
        refreshToken: null,
      },
    });

    return true;
  }

  async refreshTokens(
    userId: number,
    refreshToken: string,
  ): Promise<AuthTokens> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        roles: true,
      },
    });

    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied');

    const refreshTokenMatches = await comparePasswordAndHash(
      user.refreshToken,
      refreshToken,
    );

    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');

    const roles = user.roles.map((role) => role.name);

    const tokens = await this.getTokens(user.id, user.email, roles);
    await this.updateRefreshTokenHash(user.id, tokens.refresh_token);

    return tokens;
  }

  async getTokens(
    userId: number,
    email: string,
    roles: string[],
  ): Promise<AuthTokens> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      email: email,
      roles,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_SECRET,
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN_SECRET,
        expiresIn: '7d',
      }),
    ]);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async updateRefreshTokenHash(
    userId: number,
    refreshToken: string,
  ): Promise<void> {
    const hash = await generateFromPassword(refreshToken);

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshToken: hash,
      },
    });
  }
}
