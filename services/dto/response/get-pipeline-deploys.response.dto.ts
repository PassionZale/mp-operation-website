import { IBaseResponse } from "@interfaces/base-response.interface";
import { IDeploy } from "@interfaces/deploy.interface";

export type IGetPipelineDeploysResponseDto = IBaseResponse<IDeploy[]>;
