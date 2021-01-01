import React from "react";
import Link from "next/link";
import styles from "./index.module.css";
import { Brand } from "@constants/brands.constant";

const MiniProgramCard: React.FC<Brand> = ({id, name, logo}) => (
  <Link href={`/miniprogram/${id}`}>
    <div className={`${styles.container} flex-center`}>
      <div className={styles.inner}>
        <img className="logo" src={logo}/>
        <p className="text-center">{name}</p>
      </div>
    </div>
  </Link>
 );

export default MiniProgramCard;
