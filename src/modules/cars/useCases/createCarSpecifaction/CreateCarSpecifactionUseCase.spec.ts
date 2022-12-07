import { AppError } from "../../../../shared/errors/AppError";
import { Car } from "../../infra/typeorm/entities/Cars";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationRepositoryInMemory } from "../../repositories/in-memory/SpecificationRepositoryInMemory";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecifactionUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationRepositoryInMemory;
let car: Car;

describe("Create Car Specification", () => {

   beforeEach(async () => {
      carsRepositoryInMemory = new CarsRepositoryInMemory();
      specificationsRepositoryInMemory = new SpecificationRepositoryInMemory();
      createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
         carsRepositoryInMemory,
         specificationsRepositoryInMemory
      );
      car = await carsRepositoryInMemory.create({
         name: "Car1",
         description: "Description Car",
         daily_rate: 100,
         license_plate: "DEF-1234",
         fine_amount: 60,
         brand: "Brand",
         category_id: "category",
      });
      console.log("car ", car);
   });
   it("should be able to add a new specification to the car", async () => {
      const specification = await specificationsRepositoryInMemory.create({
         description: "test",
         name: "test",
      });
      const specifications_id = [specification.id!];
      const specificationsCars = await createCarSpecificationUseCase.execute({
         car_id: car.id,
         specifications_id,
      });
      console.log(specificationsCars);
      expect(specificationsCars).toHaveProperty("specifications");
      expect(specificationsCars.specifications.length).toBe(1);
   });

   it("should not be able to add a new specification to a now-existent car", async () => {
      expect(async () => {

         await createCarSpecificationUseCase.execute({
            car_id: "1234",
            specifications_id: ["54321"],
         });
      }).rejects.toBeInstanceOf(AppError);
   });
});