import { IDeploy } from "./deploy.interface";
import { IProject } from "./project.interface";

export interface IPipeline {
  id: number;

  name: string;

  appid: string;

  desc: string;

  type: string;

  private_key?: string;

  ci_robot: number;

  project_id: number;

  project?: IProject;

  user_id: number;

  deploy: null | IDeploy,

  deploys: IDeploy[]
}
