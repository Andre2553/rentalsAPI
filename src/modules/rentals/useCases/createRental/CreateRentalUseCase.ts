import dayjs from "dayjs";

import { AppError } from "../../../../shared/errors/AppError";
import { IDateProvider } from "../../../../shared/providers/DateProvider/IDateProvider";
import { Rental } from "../../infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../../repositories/IRentalsRepository";



interface IRequest {
   car_id: string;
   user_id: string;
   expected_return_date: Date;
}

class CreateRentalUseCase {
   constructor(
      private rentalsRepository: IRentalsRepository,
      private dateProvider: IDateProvider,
   ) { }
   async execute({ car_id, user_id, expected_return_date }: IRequest): Promise<Rental> {
      const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id);

      if (carUnavailable) {
         throw new AppError("Car is unavailable");
      }

      const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id);

      if (rentalOpenToUser) {
         throw new AppError("There's a rental in progress for the user!");
      }

      const dateNow = this.dateProvider.dateNow();

      const compare = this.dateProvider.compareInHours(
         dateNow,
         expected_return_date
      );
      
      if (compare < 24) {
         throw new AppError("Invalid return time!");
      }
      const rental = await this.rentalsRepository.create({
         car_id,
         user_id,
         expected_return_date,
      });

      return rental;
   }
}

export { CreateRentalUseCase }