
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { CreateUserUseCase } from '../CreateUsers/CreateUserUseCase'
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { AppError } from "../../../../errors/AppError";


let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
   beforeEach(() => {
      usersRepositoryInMemory = new UsersRepositoryInMemory();
      authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
      createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
   })
   it("should be able to authenticate an user", async () => {
      const user: ICreateUserDTO = {
         name: "User Test",
         email: "test@test.com.au",
         password: "1234",
         driver_license: "123456",
      };
      await createUserUseCase.execute(user);
      const result = await authenticateUserUseCase.execute({
         email: user.email,
         password: user.password,

      });
      expect(result).toHaveProperty("token");
   });
   it("should not be able to authenticate an nonexistent user", () => {
      expect(async () => {
         await authenticateUserUseCase.execute({
            email: "test@test.com.au",
            password: "123456",
         })
      }).rejects.toBeInstanceOf(AppError);

   });
   it("should not be able to authenticate with incorrect password", () => {
      expect(async () => {
         const user: ICreateUserDTO = {
            name: "User Test",
            email: "test@test.com.au",
            password: "1234",
            driver_license: "123456",
         }
         await createUserUseCase.execute(user);
         await authenticateUserUseCase.execute({
            email: user.email,
            password: "incorrectPassword",
         })
      }).rejects.toBeInstanceOf(AppError);
   });

   

})