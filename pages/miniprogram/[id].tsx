import React from "react";
import { GetServerSideProps } from "next";
import Error from "next/error";
import Layout from "@components/Layout/index";
import { getMiniProgram } from "@services/index";
import { IMiniProgram } from "@interfaces/miniprogram.interface";
import { IBaseResponse } from "@interfaces/base-response.interface";
import { IPipeline } from "@interfaces/pipeline.interface";
import PipelineCard from "@components/PipelineCard";
import Divider from "@components/Divider";
import { DEFAULT_EMPTY_MESSAGE } from "@constants/text.constant";

type Props = {
  miniprogram?: IMiniProgram;
  error?: IBaseResponse;
};

class MiniProgramPage extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { miniprogram, error } = this.props;

    if (error) {
      return <Error statusCode={500} title={error.message} />;
    }

    if (!miniprogram) {
      return <Error statusCode={404} />;
    }

    const { pipelines } = miniprogram;

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

            {pipelines.length ? (
              (pipelines as IPipeline[]).map((pipeline) => {
                return <PipelineCard key={pipeline.id} pipeline={pipeline} />;
              })
            ) : (
              <p className="text-small">
                <del>{DEFAULT_EMPTY_MESSAGE}</del>
              </p>
            )}
          </div>
        </div>
      </Layout>
    );
  }
}

export default MiniProgramPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const id = params?.id as string;

    const { data: miniprogram } = await getMiniProgram(id);

    return { props: { miniprogram } };
  } catch (error) {
    return { props: { error } };
  }
};
