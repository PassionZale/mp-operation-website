import { IBaseResponse } from "@interfaces/base-response.interface";
import { IDeploy } from "@interfaces/deploy.interface";
import { IPipeline } from "@interfaces/pipeline.interface";
import { IProject } from "@interfaces/project.interface";
import { IUser } from "@interfaces/user.interface";

export interface IDeployDetail extends IDeploy {
  project: IProject,
  pipeline: IPipeline,
  user: IUser,
}

export type IGetDeployResponseDto = IBaseResponse<IDeployDetail>;