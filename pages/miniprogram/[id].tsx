import React from "react";
import { GetServerSideProps } from "next";
import Layout from "@components/Layout/index";
import { getPipelines } from "@services/index";
import { IPipeline } from "@interfaces/pipeline.interface";

type Props = {
  items?: IPipeline[];
  errors?: string;
};

const MiniProgramPage: React.FC<Props> = ({ items, errors }) => {
  if (errors) {
    return (
      <Layout title="Error">
      <p>
        <span style={{ color: 'red' }}>Error:</span> {errors}
      </p>
    </Layout>
    );
  }

  if (items) {
    return (
      <Layout title="小程序">
        {items.map((item) => {
          return <div key={item.id}>{item.name}</div>;
        })}
      </Layout>
    );
  }

  return null
};

export default MiniProgramPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const id = params?.id as string;

    const { data } = await getPipelines({ project_id: id });

    return { props: { items: data } };
  } catch (error) {
    return { props: { errors: error.message } };
  }
};
