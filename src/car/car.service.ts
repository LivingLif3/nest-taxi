import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from 'src/entities/car.entity';
import { Repository } from 'typeorm';
import { CreateCarDto } from './car.dto';

@Injectable()
export class CarService {
    private readonly logger = new Logger(CarService.name);

    constructor(@InjectRepository(Car) private readonly carRepository: Repository<Car>) {}

    public async create(createCarDto: CreateCarDto): Promise<Car> {
        this.logger.log({
            message: 'Saving car to database',
            car_model: createCarDto.model
        });
        const createdCar = this.carRepository.create(createCarDto);
        const savedCar = await this.carRepository.save(createdCar);

        this.logger.log({
            message: 'Successfully saved car to database',
            car: savedCar.id
        });
        return savedCar;
    }

    public async delete(id: string): Promise<void> {
        this.logger.log({
            message: 'Removing car by ID',
            car_id: id
        });
        await this.carRepository.delete(id);
    }

    public async get(id: string): Promise<Car> {
        this.logger.log({
            message: 'Fetching car by ID',
            car_id: id
        });
        const car = await this.carRepository.findOneBy({ id });
        if (!car) {
            this.logger.error({
                message: 'Car was not found by ID',
                car_id: id
            });
            throw new NotFoundException('Car was not found by ID');
        }
        return car;
    }
}