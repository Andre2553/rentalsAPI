import { Repository } from 'typeorm';
import AppDataSource from '../../../../../shared/infra/typeorm';
import { ICreateUserDTO } from '../../../dtos/ICreateUserDTO';
import { User } from '../entities/User';
import { IUsersRepository } from '../../../repositories/IUsersRepository';

class UserRepository implements IUsersRepository {
   private repository: Repository<User>;
   constructor() {
      this.repository = AppDataSource.getRepository(User);
   }
   async create({ name, email, driver_license, password, avatar, id }: ICreateUserDTO): Promise<void> {
      const user = this.repository.create({
         name,
         email,
         driver_license,
         password,
         avatar,
         id,
      });

      await this.repository.save(user);
   }
   async findByEmail(email: string): Promise<any> {
      const user = await this.repository.findOneBy({ email });
      return user;
   }
   async findById(id: string): Promise<User | null> {
      const user = await this.repository.findOneBy({ id });
      return user!;
   }

}

export { UserRepository };