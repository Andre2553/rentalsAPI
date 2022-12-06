import { ICreateCarsDTO } from "../dtos/ICreateCarsDTO";
import { Car } from "../infra/typeorm/entities/Cars";

interface ICarsRepository {
   create(data: ICreateCarsDTO): Promise<Car>;
   findByLicensePlate(license_plate: string): Promise<Car|undefined>;
   findAvailable(): Promise<Car[]>;
   // findById(id: string): Promise<Car>;
   // updateAvailable(id: string, available: boolean): Promise<void>;
}

export { ICarsRepository };