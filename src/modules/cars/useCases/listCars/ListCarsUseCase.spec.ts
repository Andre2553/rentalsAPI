import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { ListCarsUseCase } from "./ListCarsUseCase";

let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
   beforeEach(() => {
      carsRepositoryInMemory = new CarsRepositoryInMemory();
      listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
   });
   it("should be able to list all available cars", async () => {
      const car = await carsRepositoryInMemory.create({
         name: "Car1",
         description: "Description",
         daily_rate: 100,
         license_plate: "ABC-1234",
         fine_amount: 60,
         brand: "Brand",
         category_id: "46292384-4240-4888-a82c-de23fab903b3",
      });

      const cars = await listCarsUseCase.execute();
      expect(cars).toEqual([car]);
   });
});