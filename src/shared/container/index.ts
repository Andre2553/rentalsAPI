import { container } from "tsyringe";
import { UserRepository } from "../../modules/accounts/infra/typeorm/repositories/UserRepository";
import { IUsersRepository } from "../../modules/accounts/repositories/IUsersRepository";
import { ICategoriesRepository } from "../../modules/cars/repositories/ICategoriesRepository";
import { CategoriesRepository } from "../../modules/cars/infra/typeorm/repositories/CategoriesRepository";
import { SpecificationsRepository } from "../../modules/cars/infra/typeorm/repositories/SpecificationsRepository";
import { ISpecificationsRepository } from "../../modules/cars/repositories/ISpecificationsRepository";


// ICategoriesRepository
container.registerSingleton<ICategoriesRepository>(
   "CategoriesRepository",
   CategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
   "SpecificationsRepository",
   SpecificationsRepository
)
container.registerSingleton<IUsersRepository>(
   "UsersRepository",
   UserRepository
)
