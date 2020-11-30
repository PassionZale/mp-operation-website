import React from "react";
import { DEFAULT_ERROR_MESSAGE } from "@constants/text.constant";
import styles from "./response.module.css";

type Props = {
  code?: number;
  message?: string;
};

const ResponseError: React.FC<Props> = ({ code, message }) => (
  <div className={styles.container}>
    <div>
      <h1 className={styles.statusCode}>{code ? code : 500}</h1>
      <div className={styles.messageWrapper}>
        <h1 className={styles.messageInner}>
          {message ? message : DEFAULT_ERROR_MESSAGE}
        </h1>
      </div>
    </div>
  </div>
);

export default ResponseError;
