
import { injectable, inject } from "tsyringe";
import { ICarsRepository } from "../../repositories/ICarsRepository";
import { Car } from "../../infra/typeorm/entities/Cars";
import { AppError } from "../../../../shared/errors/AppError";

interface IRequest {
   name: string;
   description: string;
   daily_rate: number;
   license_plate: string;
   fine_amount: number;
   brand: string;
   category_id: string;
}

@injectable()
class CreateCarUseCase {
   constructor(
      @inject("CarsRepository")
      private carsRepository: ICarsRepository) { }

   async execute({ name, brand, description, daily_rate, license_plate, fine_amount, category_id }: IRequest): Promise<Car|void> {

      const carAlreadyExists = await this.carsRepository.findByLicensePlate(
         license_plate
      );

      if (carAlreadyExists !== undefined) {
         throw new AppError("Car already exists!");
      } else {
         const car = await this.carsRepository.create({
            name,
            brand,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            category_id,
         });
         console.log('car created')
         return car;
      }
   }
}
export { CreateCarUseCase };