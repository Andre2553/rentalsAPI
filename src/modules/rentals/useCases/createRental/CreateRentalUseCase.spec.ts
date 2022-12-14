import dayjs from "dayjs";

import { AppError } from "../../../../shared/errors/AppError";
import { DaysjsDateProvider } from "../../../../shared/providers/DateProvider/implementations/DaysjsDateProvider";
import { RentalsRepositoryInMemory } from "../../repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dateProvider: DaysjsDateProvider;
describe("Create Rental", () => {
   const dayAdd24hours = dayjs().add(1, "day").toDate();

   beforeEach(() => {
      rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
      dateProvider = new DaysjsDateProvider();
      createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, dateProvider);
   })

   it("should be able to create a new rental", async () => {
      const rental = await createRentalUseCase.execute({
         car_id: "12345",
         user_id: "12345",
         expected_return_date: dayAdd24hours
      });
      expect(rental).toHaveProperty("id");
      expect(rental).toHaveProperty("start_date");
   })

   it("should not be able to create a new rental if there is another open to the same user", async () => {
      expect(async () => {
         await createRentalUseCase.execute({
            car_id: "12345",
            user_id: "12345",
            expected_return_date: dayAdd24hours
         });
         await createRentalUseCase.execute({
            car_id: "12345",
            user_id: "12345",
            expected_return_date: dayAdd24hours
         });
      }).rejects.toBeInstanceOf(AppError);
   })

   it("should not be able to create a new rental if there is another open to the same car", async () => {
      expect(async () => {
         await createRentalUseCase.execute({
            car_id: "test",
            user_id: "123",
            expected_return_date: dayAdd24hours
         });
         await createRentalUseCase.execute({
            car_id: "test",
            user_id: "321",
            expected_return_date: dayAdd24hours
         });
      }).rejects.toBeInstanceOf(AppError);
   })

   it("should not be able to create a new rental with invalid return time", async () => {
      expect(async () => {
         await createRentalUseCase.execute({
            car_id: "test",
            user_id: "123",
            expected_return_date: dayjs().toDate()
         });
      }).rejects.toBeInstanceOf(AppError);
   })


})