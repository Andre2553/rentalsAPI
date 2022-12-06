import { ICreateCarsDTO } from "../../dtos/ICreateCarsDTO";
import { Car } from "../../infra/typeorm/entities/Cars";
import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository{
   cars: Car[] = [];
   async create({brand,category_id,daily_rate, license_plate, description,fine_amount, name}: ICreateCarsDTO): Promise<Car> {
      const car = new Car();
      Object.assign(car, {
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id,
            created_at: new Date(),
      });
      this.cars.push(car);
      return car;
   }
   async findByLicensePlate(license_plate: string): Promise<Car|undefined> {
      return this.cars.find((car) => car.license_plate === license_plate);

   }
   async findAvailable(): Promise<Car[]> {
      return this.cars.filter((car) => car.available === true);
   }
   // findById(id: string): Promise<Car> {
   //    throw new Error("Method not implemented.");
   // }
   // updateAvailable(id: string, available: boolean): Promise<void> {
   //    throw new Error("Method not implemented.");
   // }


}

export { CarsRepositoryInMemory };