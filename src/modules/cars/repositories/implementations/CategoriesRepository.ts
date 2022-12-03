import { Category } from "../../entities/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "../ICategoriesRepository";
import { Repository} from "typeorm"
import AppDataSource from "../../../../database";

class CategoriesRepository implements ICategoriesRepository {
   private repository: Repository<Category>;

   constructor() {
      this.repository = AppDataSource.getRepository(Category);
   }


   async create({ name, description }: ICreateCategoryDTO): Promise<void> {
      const category = await this.repository.create({
         name,
         description,
      });

      await this.repository.save(category);
   }

   async list(): Promise<Category[]> {
      const categories = await this.repository.find();
      return categories;
   }

   async findByName(name: string): Promise<Category|null> {
      const category = await this.repository.findOneBy({ name });
      return category;
   }
}

export { CategoriesRepository };