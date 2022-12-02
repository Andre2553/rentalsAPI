import { Specification } from "../../entities/Specification";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository {
  private specifications: Specification[];

  private static INSTANCE: SpecificationsRepository;
  private constructor() {
    this.specifications = [];
  }

  public static getInstance(): SpecificationsRepository {
    if (!SpecificationsRepository.INSTANCE) {
      SpecificationsRepository.INSTANCE = new SpecificationsRepository();
    }

    return SpecificationsRepository.INSTANCE;
  }

  create({ name, description }: ICreateSpecificationDTO): void {
    const specification = new Specification();
    Object.assign(specification, {
      name,
      description,
    });

     this.specifications.push(specification);
  }

   findByName(name: string): Specification|null {
    const specification =  this.specifications.find((specification) => specification.name === name);
    if (!specification) {
      return null;
    }
    return specification;
  }

//   findByIds(ids: string[]): Specification[] {
//     const specifications = this.specifications.find((specification) => ids.includes(specification.id));

//     return specifications;
//   }
}

export { SpecificationsRepository };