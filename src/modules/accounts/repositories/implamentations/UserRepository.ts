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
   async create({ name, email, driver_license, password }: ICreateUserDTO): Promise<void> {
      const user = this.repository.create({
         name,
         email,
         driver_license,
         password,
      });

      await this.repository.save(user);
   }
   async findByEmail(email: string): Promise<any> {
      const user = await this.repository.findOneBy({email});
      return user;
   }
   findById(id: string): Promise<any> {
      throw new Error('Method not implemented.');
   }

}

export { UserRepository };