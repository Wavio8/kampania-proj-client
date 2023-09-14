import axios from "@/core/axios";
import {KampaniaDto} from "@/api/dto/kampania.dto";

export const beckendCreate =async (values: KampaniaDto)=>{
    return(await axios.post("/add",values)).data
}