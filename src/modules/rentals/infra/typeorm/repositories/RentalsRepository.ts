import { Repository } from "typeorm";
import { ICreateRentalDTO } from "../../../dtos/ICreateRentalDTO";
import { IRentalsRepository } from "../../../repositories/IRentalsRepository";
import { Rental } from "../entities/Rental";
import AppDataSource from "../../../../../shared/infra/typeorm";
class RentalsRepository implements IRentalsRepository{
   private repository: Repository<Rental>

   constructor() {
      this.repository = AppDataSource.getRepository(Rental);
   }
   async findOpenRentalByCar(car_id: string): Promise<Rental | null> {
      const openByCar = this.repository.findOneBy({car_id});
      return openByCar;
   }
   async findOpenRentalByUser(user_id: string): Promise<Rental | null> {
      const openByUser = this.repository.findOneBy({user_id});
      return openByUser;
   }
   async create({car_id, expected_return_date, user_id}: ICreateRentalDTO): Promise<Rental> {
      const rental = this.repository.create({
         car_id,
         expected_return_date,
         user_id
      });
      
      await this.repository.save(rental);
      return rental;

   }


}

export { RentalsRepository };