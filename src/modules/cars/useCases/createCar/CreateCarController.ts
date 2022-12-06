import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCarUseCase } from "./CreateCarUseCase";


class CreateCarController {

   handle(request: Request, response: Response): Response {
      const { name, description, daily_rate, license_plate, fine_amount, brand, category_id } = request.body;
      console.log('CreateCarController')
      const createCarUseCase = container.resolve(CreateCarUseCase)
      try{
         const car = createCarUseCase.execute({
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id,
         });
         console.log("car: "+car)
         return response.status(201).json(car);
      }
      catch(err){
         console.log(err)
         return response.status(401).send("Car already exists!")
      }

      
   }
}

export { CreateCarController };