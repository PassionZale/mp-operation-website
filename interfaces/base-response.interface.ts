/**
 * 基础响应数据接口
 */
export interface IBaseResponse<T = any> {
  /**
   * 业务状态码
   */
  code: number;
  /**
   * 响应数据
   */
  data: T;
  /**
   * 响应消息
   */
  message: string;
  /**
   * 响应时间戳
   */
  timestamp: number;
  /**
   * api path
   */
  path?: string;
}
