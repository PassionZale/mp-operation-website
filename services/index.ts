import request from "@utils/request";
import { IGetProjectsResponseDto } from "./dto/response/get-projects.response.dto";
import { IGetMiniProgramResponseDto } from "./dto/response/get-miniprogram.response.dto";

export const getMiniProgram = async (
  id: number | string
): Promise<IGetMiniProgramResponseDto> => {
  return request.get(`/miniprogram/${id}`);
};

export const getProjects = async (): Promise<IGetProjectsResponseDto> => {
  return request.get("/projects");
};
