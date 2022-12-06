import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
   beforeEach(() => {
      carsRepositoryInMemory = new CarsRepositoryInMemory();
      listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
   });
   it("should be able to list all available cars", async () => {
      const car = await carsRepositoryInMemory.create({
         name: "Car0",
         description: "Description",
         daily_rate: 100,
         license_plate: "ABC-1234",
         fine_amount: 60,
         brand: "Brand",
         category_id: "46292384-4240-4888-a82c-de23fab903b3",
      });

      const cars = await listAvailableCarsUseCase.execute({});
      expect(cars).toEqual([car]);
   });
   it("should be able to list all available cars by Brand filter", async () => {
      const car = await carsRepositoryInMemory.create({
         name: "Car1",
         description: "Description",
         daily_rate: 100,
         license_plate: "ABC-1234S",
         fine_amount: 60,
         brand: "Brand_test",
         category_id: "46292384-4240-4888-a82c-de23fab903b3",
      });
      await carsRepositoryInMemory.create({
         name: "Car2",
         description: "Description",
         daily_rate: 100,
         license_plate: "ABC-1234XXX",
         fine_amount: 60,
         brand: "Brand",
         category_id: "46292384-4240-4888-a82c-de23fab903b3",
      });

      const cars = await listAvailableCarsUseCase.execute({
         brand: "Brand_test",
      });
      expect(cars).toEqual([car]);
   });
   it("should be able to list all available cars by Name filter", async () => {
      const car = await carsRepositoryInMemory.create({
         name: "Car1",
         description: "Description",
         daily_rate: 100,
         license_plate: "ABC-1234S",
         fine_amount: 60,
         brand: "Brand_test",
         category_id: "46292384-4240-4888-a82c-de23fab903b3",
      });
      await carsRepositoryInMemory.create({
         name: "Car2",
         description: "Description",
         daily_rate: 100,
         license_plate: "ABC-1234XXX",
         fine_amount: 60,
         brand: "Brand",
         category_id: "46292384-4240-4888-a82c-de23fab903b3",
      });

      const cars = await listAvailableCarsUseCase.execute({
         name: "Car1",
      });
      expect(cars).toEqual([car]);
   });
   it("should be able to list all available cars by Category filter", async () => {
      const car = await carsRepositoryInMemory.create({
         name: "Car1",
         description: "Description",
         daily_rate: 100,
         license_plate: "ABC-1234S",
         fine_amount: 60,
         brand: "Brand_test",
         category_id: "46292384-4240-4888-a82c-de23fab903b3",
      });
      await carsRepositoryInMemory.create({
         name: "Car2",
         description: "Description",
         daily_rate: 100,
         license_plate: "ABC-1234XXX",
         fine_amount: 60,
         brand: "Brand",
         category_id: "46292384-4240-4888",
      });

      const cars = await listAvailableCarsUseCase.execute({
         category_id: "46292384-4240-4888-a82c-de23fab903b3",
      });
      expect(cars).toEqual([car]);
   });

});