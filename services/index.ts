import getConfig from "next/config";
import request from "@utils/request";
import { IGetProjectsResponseDto } from "./dto/response/get-projects.response.dto";
import { IGetMiniProgramResponseDto } from "./dto/response/get-miniprogram.response.dto";
import { IDownloadMiniProgramRequestDto } from "./dto/request/download-miniprogram.request.dto";
import { AxiosResponse } from "axios";
import { IGetDeployResponseDto } from "./dto/response/get-deploy.response.dto";
import { IGetMiniProgramPipelineDeploysResponseDto } from "./dto/response/get-miniprogram-pipeline-deploys.response.dto";

const { publicRuntimeConfig } = getConfig();

export const getProjects = async (): Promise<IGetProjectsResponseDto> => {
  return request.get("/projects");
};

export const getMiniProgram = async (
  id: number | string
): Promise<IGetMiniProgramResponseDto> => {
  return request.get(`/miniprogram/${id}`);
};

export const getMiniProgramPipelineDeploys = async (
  projectId: number | string,
  pipelineId: number | string
): Promise<IGetMiniProgramPipelineDeploysResponseDto> => {
  return request.get(`/miniprogram/${projectId}/pipeline/${pipelineId}`);
};

export const getDeploy = async (id: string): Promise<IGetDeployResponseDto> => {
  return request.get(`/pipeline-deploy/${id}`)
}

export const downloadMiniProgram = async (
  params: IDownloadMiniProgramRequestDto
): Promise<AxiosResponse<Blob>> => {
  return request.get("/api/download", {
    baseURL: publicRuntimeConfig.basePath,
    headers: {
      "Content-Type": "application/json; application/octet-stream",
    },
    params,
    responseType: "blob",
    timeout: 0,
  });
};