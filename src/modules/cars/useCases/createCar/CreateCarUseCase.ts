import { AppError } from "../../../../shared/errors/AppError";

import {injectable,inject} from "tsyringe";
import { ICarsRepository } from "../../repositories/ICarsRepository";

interface IRequest {
   name: string;
   description: string;
   daily_rate: number;
   license_plate: string;
   fine_amount: number;
   brand: string;
   category_id: string;
}

// @injectable()
class CreateCarUseCase {
   constructor(
      // @inject("CarsRepository")
      private carsRepository: ICarsRepository) {}
   
   async execute({name,brand,description,daily_rate,license_plate,fine_amount,category_id}:IRequest ): Promise<void> {

      await this.carsRepository.create({
         name,
         brand,
         description,
         daily_rate,
         license_plate,
         fine_amount,
         category_id,
      });


      // const carAlreadyExists = await this.carsRepository.findByLicensePlate(
      //    data.license_plate
      // );
   
      // if (carAlreadyExists) {
      //    throw new AppError("Car already exists!");
      // }
   
      // this.carsRepository.create(data);
   }
}
export { CreateCarUseCase };