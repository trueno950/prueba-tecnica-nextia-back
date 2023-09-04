// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { Strategy, ExtractJwt } from 'passport-jwt';
// import { UsersRepository } from '../users/users.repository';
// import { jwtConstants } from './jwt.constants';
// import { Role } from '../users/enums/role.enum';

// export interface JwtPayload {
//   userId: number;
//   roles: Role[];
// }

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor(private userRepository: UsersRepository) {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       ignoreExpiration: false,
//       secretOrKey: jwtConstants.secret,
//     });
//   }

//   async validate(payload: JwtPayload) {
//     const user = await this.userRepository.findById(payload.userId);
//     console.log('user, ', user)
//     if (!user) {
//       throw new UnauthorizedException();
//     }

//     const roles = user.roles;

//     if (!roles.includes(Role.User)) {
//       throw new UnauthorizedException(
//         'No tienes permisos para acceder a esta ruta.',
//       );
//     }
//     return { userId: payload.userId, roles };
//   }
// }
