import request from "@utils/request";

import { IGetPipelinesRequestDto } from "./dto/request/get-pipelines.request.dto";

import { IGetPipelinesResponseDto } from "./dto/response/get-pipelines.response.dto";
import { IGetPipelineDeploysResponseDto } from "./dto/response/get-pipeline-deploys.response.dto";
import { IGetProjects } from "./dto/response/get-projects.response.dto";
import { IGetProject } from "./dto/response/get-project.response.dto";
import { IGetMiniProgramResponseDto } from "./dto/response/get-miniprogram.response.dto";

export const getMiniProgram = async (id: number | string): Promise<IGetMiniProgramResponseDto> => {
  return request.get(`/miniprogram/${id}`)
}

export const getProject = async (id: number | string): Promise<IGetProject> => {
  return request.get(`/project/${id}`)
}

export const getProjects = async (): Promise<IGetProjects> => {
  return request.get("/projects")
}

export const getPipelines = async (
  params: IGetPipelinesRequestDto
): Promise<IGetPipelinesResponseDto> => {
  return request.get("/pipelines", { params });
};

export const getPipelineDeploys = async (
  pipelineId: string | number
): Promise<IGetPipelineDeploysResponseDto> => {
  return request.get(`/pipeline/${pipelineId}/deploys`);
};
