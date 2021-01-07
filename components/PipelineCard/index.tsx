import React, { Fragment } from "react";
import { IPipeline } from "@interfaces/pipeline.interface";
import DelopyLog from "@components/DeployLog/index";
import { DEFAULT_EMPTY_MESSAGE } from "@constants/text.constant";
import Divider from "@components/Divider";
import styles from "./index.module.css";
import Link from "next/link";

type Props = {
  pipeline: IPipeline;
};

const Deploy: React.FC<Props> = ({ pipeline }) => (
  <Fragment>
    {pipeline.deploy ? (
      <Fragment>
        <DelopyLog projectId={pipeline.project_id} deploy={pipeline.deploy} />
        <Divider />
      </Fragment>
    ) : (
      <p className="text-small">{DEFAULT_EMPTY_MESSAGE}</p>
    )}
  </Fragment>
);

const Deploys: React.FC<Props> = ({ pipeline }) => (
  <Fragment>
    {pipeline.deploys && pipeline.deploys.length ? (
      pipeline.deploys.map((deploy) => (
        <Fragment>
          <DelopyLog
            key={deploy.id}
            projectId={pipeline.project_id}
            deploy={deploy}
          />
          <Divider />
        </Fragment>
      ))
    ) : (
      <p className="text-small">{DEFAULT_EMPTY_MESSAGE}</p>
    )}
  </Fragment>
);

const PipelineCard: React.FC<Props> = ({ pipeline }) => (
  <div>
    <Link
      href={{
        pathname: "/miniprogram/[id]/pipeline/[pid]",
        query: {
          id: pipeline.project_id,
          pid: pipeline.id,
        },
      }}
    >
      <p className={styles.name}>
        <u>{pipeline.name}</u>
      </p>
    </Link>

    <blockquote className="pre-wrap text-small">{pipeline.desc}</blockquote>

    {
      pipeline.deploys && pipeline.deploys.length ? Deploys({ pipeline }) : Deploy({ pipeline })
    }
  </div>
);

export default PipelineCard;
