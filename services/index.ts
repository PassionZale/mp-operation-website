import request from "@utils/request";

import { IGetPipelinesRequestDto } from "./dto/request/get-pipelines.request.dto";

import { IGetPipelinesResponseDto } from "./dto/response/get-pipelines.response.dto";
import { IGetPipelineDeploysResponseDto } from "./dto/response/get-pipeline-deploys.response.dto";
import { IGetProject } from "./dto/response/get-projects.response.dto";

export const getProjects = async (): Promise<IGetProject> => {
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
