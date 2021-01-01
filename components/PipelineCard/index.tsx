import React from "react";
import { IPipeline } from "@interfaces/pipeline.interface";
import DelopyLog from "@components/DeployLog/index";
import { DEFAULT_EMPTY_MESSAGE } from "@constants/text.constant";
import Divider from "@components/Divider";
import styles from "./index.module.css";

type Props = {
  pipeline: IPipeline;
};

const PipelineCard: React.FC<Props> = ({ pipeline }) => (
  <div>
    <p className={styles.name}>
      <u>{pipeline.name}</u>
    </p>

    <blockquote className="pre-wrap text-small">{pipeline.desc}</blockquote>

    {pipeline.deploy ? (
      <DelopyLog deploy={pipeline.deploy} />
    ) : (
      <p className="text-small">
        <del>{DEFAULT_EMPTY_MESSAGE}</del>
      </p>
    )}

    <Divider />
  </div>
);

export default PipelineCard;
