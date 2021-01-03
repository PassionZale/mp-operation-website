import { IDeploy } from "@interfaces/deploy.interface";
import Link from "next/link";
import React, { Fragment } from "react";

type Props = {
  projectId: number | string;
  deploy: IDeploy;
};
class DeployLog extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { user, ...deploy } = this.props.deploy;
    const { projectId } = this.props;

    return (
      <Fragment>
        <div className="top-gap">
          <strong>v{deploy.version}</strong>

          <div className="text-light text-small">
            <div className="top-gap flex-left flex-middle">
              <img className="avatar" src={user.avatar} />
              &nbsp;
              <strong>{user.fullname}</strong>
              &nbsp;
              <span>Deployed @ {deploy.deployed_at}</span>
            </div>
            <div className="top-gap">
              <Link
                href={{
                  pathname: "/miniprogram/[id]/download",
                  query: {
                    id: projectId,
                    pipeline_id: deploy.pipeline_id,
                    deploy_id: deploy.id,
                  },
                }}
              >
                <a className="text-primary" title="点击下载" target="_blank">
                  {deploy.id}.zip
                </a>
              </Link>
            </div>
          </div>
        </div>

        <div className="top-gap">
          <strong className="text-small">更新说明:</strong>

          <div className="top-gap text-light text-small pre-wrap">
            {deploy.desc}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default DeployLog;
