import { Category } from "../entities/Category";

interface ICreateCategoryDTO {
   name: string;
   description: string;
}

interface ICategoriesRepository {
   findByName(name: string): Category|null;
   list(): Category[];
   create({ name, description }: ICreateCategoryDTO): void;
}

export { ICategoriesRepository, ICreateCategoryDTO }