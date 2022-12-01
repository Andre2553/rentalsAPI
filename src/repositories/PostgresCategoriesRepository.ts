import { Category } from "../model/Category";
import { ICategoriesRepository } from "./ICategoriesRepository";

class PostgresCategoriesRepository implements ICategoriesRepository{
   findByName(name: string): Category {
      throw new Error("Method not implemented.");
   }
   list(): Category[] {
      throw new Error("Method not implemented.");
   }
   create({ name, description }: { name: any; description: any; }): void {
      throw new Error("Method not implemented.");
   }

}

export { PostgresCategoriesRepository }