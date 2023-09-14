import {KampaniaDto} from "@/api/dto/kampania.dto";
import {KampaniaRecponseDto} from "@/api/dto/kampaniaRecponse.dto";

export interface CoreKampDto {
    id: number;
    name: string;
    kampania: KampaniaRecponseDto[];


}
