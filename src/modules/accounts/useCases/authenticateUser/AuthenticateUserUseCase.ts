import { inject, injectable } from 'tsyringe'
import {compare} from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { AppError } from '../../../../shared/errors/AppError';
interface IRequest {
   email: string;
   password: string;
}
interface IResponse {
   user: {
      name: string;
      email: string;
   };
   token: string;
}
@injectable()
class AuthenticateUserUseCase {
   constructor(
      @inject("UsersRepository")
      private usersRepository: IUsersRepository,
      // private hashProvider: IHashProvider,
      // private jwtProvider: IJWTProvider,
   ) {}
   
   async execute({ email, password }: IRequest): Promise<IResponse> {
      const user = await this.usersRepository.findByEmail(email);
   
      if (!user) {
         throw new AppError('Email or password incorrect');
      }
   
      const passwordMatch = await compare(
         password,
         user.password,
      );
   
      if (!passwordMatch) {
         throw new AppError('Email or password incorrect');
      }
   
      const token = sign({},"d2d2f8a8f7c8b5a5d5d5d5d5d5d5d5d5",{   
         subject:user.id,
         expiresIn:"1d"
      });
   
      return {
         user:{
            name: user.name,
            email: user.email,
         },
         token,
      };
   }
}

export { AuthenticateUserUseCase };