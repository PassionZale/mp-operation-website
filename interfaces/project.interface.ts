export interface IProject {
  id: number;

  name: string;

  logo: string;

  desc: string;

  user_id: number;

  created_at?: Date;

  updated_at?: Date;
}