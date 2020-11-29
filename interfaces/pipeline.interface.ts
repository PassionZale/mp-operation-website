export interface IPipeline {
  id: number;

  name: string;

  appid: string;

  desc: string;

  type: string;

  private_key?: string;

  ci_robot: number;

  project_id: number;

  user_id: number;
}
