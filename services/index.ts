import request from "@utils/request";
import { IGetPipelinesRequestDto } from "./dto/request/get-pipelines.request.dto";
import { IGetPipelinesResponseDto } from "./dto/response/get-pipelines.response.dto";

export async function getPipelines(
  params: IGetPipelinesRequestDto
): Promise<IGetPipelinesResponseDto> {
  return request.get("/pipelines", { params });
}
