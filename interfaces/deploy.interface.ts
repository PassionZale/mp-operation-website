export interface IDeploy {
  id: string;
  desc: string;
  version: string;
  project_path: string;
  pipeline_id: number;
  user_id: number;
  deployed_at: Date;
}
