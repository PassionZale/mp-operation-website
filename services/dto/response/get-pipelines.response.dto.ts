import { IBaseResponse } from "@interfaces/base-response.interface";
import { IPipeline } from "@interfaces/pipeline.interface";

export type IGetPipelinesResponseDto = IBaseResponse<IPipeline[]>;
