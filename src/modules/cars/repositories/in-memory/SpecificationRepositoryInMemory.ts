import { Specification } from "../../infra/typeorm/entities/Specification";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../ISpecificationsRepository";

class SpecificationRepositoryInMemory implements ISpecificationsRepository {
   specifications: Specification[] = [];
   async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
      const specification = new Specification();
      Object.assign(specification, {
         name,
         description,
      });
      this.specifications.push(specification);
      return specification;
   }
   async findByName(name: string): Promise<Specification | null> {
      const specification = this.specifications.find((specification) => specification.name === name);
      if (specification == undefined) {
         return null;
      }
      return specification;
   }
   async findByIds(ids: string[]): Promise<Specification[]> {
      let allSpecifications: Specification[] = [];;
      allSpecifications = this.specifications.filter((specification) => {
         return ids.includes(specification?.id!)
      });

      return allSpecifications;
   }

}

export { SpecificationRepositoryInMemory }