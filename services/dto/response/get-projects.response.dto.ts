import { IBaseResponse } from "@interfaces/base-response.interface";
import { IProject } from "@interfaces/project.interface";

export type IGetProjectsResponseDto = IBaseResponse<IProject[]>;
