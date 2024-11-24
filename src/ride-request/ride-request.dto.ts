import { IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator';
import { Location } from 'src/entities/location.entity';
import { RideTarrif } from 'src/entities/ride-request.entity';

export class CreateRideRequestDto {
  @IsObject()
  startLocation: Location;

  @IsObject()
  endLocation: Location;

  @IsString()
  passanger_id?: string;

  @IsString()
  @IsNotEmpty()
  tarrif: RideTarrif;

  @IsNumber()
  cost: number;
}