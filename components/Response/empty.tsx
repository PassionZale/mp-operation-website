import React from "react";
import { DEFAULT_EMPTY_MESSAGE } from "@constants/text.constant";
import styles from "./response.module.css";

type Props = {
  message?: string
}

const ResponseEmpty: React.FC<Props> = ({ message }) => (
  <div className={styles.container}>
    <div>
      <h1 className={styles.statusCode}>Ooops!</h1>
      <div className={styles.messageWrapper}>
        <h1 className={styles.messageInner}>{ message ? message : DEFAULT_EMPTY_MESSAGE }</h1>
      </div>
    </div>
  </div>
)

export default ResponseEmpty