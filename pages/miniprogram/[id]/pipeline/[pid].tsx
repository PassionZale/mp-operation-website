import React from "react";
import { GetServerSideProps } from "next";
import Error from "next/error";
import Layout from "@components/Layout/index";
import { getMiniProgramPipelineDeploys } from "@services/index";
import { IBaseResponse } from "@interfaces/base-response.interface";
import { IPipeline } from "@interfaces/pipeline.interface";
import PipelineCard from "@components/PipelineCard";
import Divider from "@components/Divider";
import { IProject } from "@interfaces/project.interface";

type Props = {
  pipeline?: IPipeline;
  error?: IBaseResponse;
};

class PipelinePage extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { pipeline, error } = this.props;

    if (error) {
      return <Error statusCode={500} title={error.message} />;
    }

    if (!pipeline) {
      return <Error statusCode={404} />;
    }

    const miniprogram = pipeline.project as IProject;

    return (
      <Layout title={miniprogram.name}>
        <div className="flex-center">
          <div
            className="container"
            style={{
              background: "#fff",
              padding: "20px 40px",
              boxSizing: "border-box",
              minHeight: "100vh",
            }}
          >
            <div className="flex-center">
              <img className="logo" src={miniprogram.logo} />
            </div>

            <p>
              <strong>{miniprogram.name}</strong>
            </p>

            <p className="pre-wrap text-small">{miniprogram.desc}</p>

            <Divider />

            <PipelineCard key={pipeline.id} pipeline={pipeline} />
          </div>
        </div>
      </Layout>
    );
  }
}

export default PipelinePage;

type Params = {
  id?: string;
  pid?: string;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const params = context.params as Params;
    const id = params?.id as string;
    const pid = params?.pid as string;

    if (!id || !pid) {
      return { props: {} };
    }

    const { data: pipeline } = await getMiniProgramPipelineDeploys(id, pid);

    return { props: { pipeline } };
  } catch (error) {
    return { props: { error } };
  }
};
