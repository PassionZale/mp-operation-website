import React from "react";
import { GetServerSideProps } from "next";
import Layout from "@components/Layout/index";
import ResponseEmpty from "@components/Response/empty";
import ResponseError from "@components/Response/error";
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
        <ResponseError message={errors} />
      </Layout>
    );
  }

  if (items && items.length) {
    return (
      <Layout title="小程序">
        {items.map((item) => {
          return <div key={item.id}>{item.name}</div>;
        })}
      </Layout>
    );
  }

  return (
    <Layout title="Empty">
      <ResponseEmpty message={errors} />
    </Layout>
  );
};

export default MiniProgramPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const id = params?.id as string;
    const project_id = +id;

    const { data } = await getPipelines({ project_id });

    return { props: { items: data } };
  } catch (error) {
    return { props: { errors: error.message } };
  }
};
