import { IUsersRepository } from "../../repositories/IUsersRepository";
import {inject, injectable} from 'tsyringe'
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";

@injectable()
class CreateUserUseCase {
   constructor(
      @inject("UsersRepository")
      private usersRepository: IUsersRepository,
   ) {}
   
   async execute({name, password, email, driver_license}: ICreateUserDTO): Promise<void>{
      // const userAlreadyExists = await this.usersRepository.findByEmail(email);

      // if(userAlreadyExists){
      //    throw new Error("User already exists!");
      // }

      await this.usersRepository.create({
         name,
         password,
         email,
         driver_license
      });
   }
}

export { CreateUserUseCase }