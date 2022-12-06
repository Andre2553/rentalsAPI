import { AppError } from "../../../../shared/errors/AppError";
import { ICreateCarsDTO } from "../../dtos/ICreateCarsDTO";
import { Car } from "../../infra/typeorm/entities/Cars";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
   beforeEach(() => {
      carsRepositoryInMemory = new CarsRepositoryInMemory();
      createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
   });
   it("should be able to create a new car", async () => {

    
      const car = await createCarUseCase.execute({
         name: "Name",
         description: "Description",
         daily_rate: 100,
         license_plate: "ABC-CSD",
         fine_amount: 60,
         brand: "Brand",
         category_id: "category",
      });
      expect(car).toHaveProperty("id");
   });
   it("should not be able to create a car with a preexisting license plate in the database", async () => {
      expect(async () => {
         await createCarUseCase.execute({
            name: "Car1",
            description: "Description Car",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "Brand",
            category_id: "category",
         });
         await createCarUseCase.execute({
            name: "Car2",
            description: "Description Car",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "Brand",
            category_id: "category",
         });
      }).rejects.toBeInstanceOf(AppError);
   });
   it("should be able to create a car with available true by default", async () => {
      
      const car = await createCarUseCase.execute({
         name: "Car Available New",
         description: "Description Car new",
         daily_rate: 100,
         license_plate: "AXXX-1238",
         fine_amount: 60,
         brand: "Brand",
         category_id: "category",
      }); 
      expect(car?.available).toBe(true);
   });


});