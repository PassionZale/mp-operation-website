import { IDeploy } from "@interfaces/deploy.interface";
import React from "react";

type Props = {
  deploy: IDeploy;
};

const MiniProgramDeploy: React.FC<Props> = ({ deploy }) => (
  <div>
    {deploy.desc} - {deploy.version} - {deploy.deployed_at}
  </div>
);

export default MiniProgramDeploy;
