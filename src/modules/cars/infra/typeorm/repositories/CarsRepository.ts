import { Repository } from "typeorm";
import AppDataSource from "../../../../../shared/infra/typeorm";
import { ICreateCarsDTO } from "../../../dtos/ICreateCarsDTO";
import { ICarsRepository } from "../../../repositories/ICarsRepository";
import { Car } from "../entities/Cars";

class CarsRepository implements ICarsRepository{
   private repository: Repository<Car>;
   
   constructor(){
      this.repository = AppDataSource.getRepository(Car);
   }

   async create({brand,category_id,daily_rate, license_plate, description,fine_amount, name}: ICreateCarsDTO): Promise<Car> {
      const car =  this.repository.create({
         name,
         description,
         daily_rate,
         license_plate,
         fine_amount,
         brand,
         category_id,
         created_at: new Date(),
      });
      await this.repository.save(car);
      return car;
   }
   async findByLicensePlate(license_plate: string): Promise<Car | null> {
      const car = await this.repository.findOneBy({license_plate});
      console.log('carFind',car);
      return car;
   }

}

export { CarsRepository };