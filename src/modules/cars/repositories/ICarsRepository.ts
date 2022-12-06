import { ICreateCarsDTO } from "../dtos/ICreateCarsDTO";

interface ICarsRepository {
   create(data: ICreateCarsDTO): Promise<void>;
   // findByLicensePlate(license_plate: string): Promise<Car>;
   // findAvailable(
   //    brand?: string,
   //    category_id?: string,
   //    name?: string
   // ): Promise<Car[]>;
   // findById(id: string): Promise<Car>;
   // updateAvailable(id: string, available: boolean): Promise<void>;
}

export { ICarsRepository };