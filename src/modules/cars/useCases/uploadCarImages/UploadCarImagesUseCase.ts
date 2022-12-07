import { CarImage } from "../../infra/typeorm/entities/CarImage";
import { ICarsImagesRepository } from "../../repositories/ICarsImagesRepository";
import { ICarsRepository } from "../../repositories/ICarsRepository";
import {injectable, inject} from 'tsyringe'
import { AppError } from "../../../../shared/errors/AppError";

interface IRequest {
   car_id: string;
   images_name: string[];
}

@injectable()
class UploadCarImagesUseCase {
   constructor(
      @inject("CarsImagesRepository")
      private carImagesRepository: ICarsImagesRepository,
   ) {}
   
   async execute({
      car_id,
      images_name,
   }: IRequest): Promise<void> {

      images_name.map(async (image) => {
         let c = await this.carImagesRepository.create(car_id, image);
         return c;
      })

   }
}

export { UploadCarImagesUseCase }