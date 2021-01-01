import { IPipeline } from "./pipeline.interface";
import { IProject } from "./project.interface";

export interface IMiniProgram extends IProject{
  pipelines: [] | IPipeline []
}