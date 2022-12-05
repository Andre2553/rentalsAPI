import { Repository } from 'typeorm';
import AppDataSource from '../../../../database';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

class UserRepository implements IUsersRepository {
   private repository: Repository<User>;
   constructor() {
      this.repository = AppDataSource.getRepository(User);
   }
   async create({ name, username, email, driver_license, password }: ICreateUserDTO): Promise<void> {
      const user = this.repository.create({
         name,
         username,
         email,
         driver_license,
         password,
      });
      
      await this.repository.save(user);
   }
   findByEmail(email: string): Promise<any> {
      throw new Error('Method not implemented.');
   }
   findById(id: string): Promise<any> {
      throw new Error('Method not implemented.');
   }

}

export { UserRepository };