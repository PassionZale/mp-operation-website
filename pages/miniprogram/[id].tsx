import React from "react";
import { GetServerSideProps } from "next";
import Link from "next/link";
import Layout from "@components/Layout/index";
import ResponseEmpty from "@components/Response/empty";
import ResponseError from "@components/Response/error";
import MiniProgramDeploy from "@components/MiniProgramDeploy/index";
import { getPipelines, getPipelineDeploys } from "@services/index";
import { IPipeline } from "@interfaces/pipeline.interface";
import { BRANDS, Brand } from "@constants/brands.constant";
import { IDeploy } from "@interfaces/deploy.interface";

type Props = {
  brand?: Brand;
  pipelines?: IPipeline[];
  deploys?: IDeploy[];
  pipelineId?: string | number;
  errors?: string;
};

class MiniProgramPage extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { errors, brand, pipelines, pipelineId, deploys } = this.props;

    if (errors) {
      return (
        <Layout title="Error">
          <ResponseError message={errors} />
        </Layout>
      );
    }

    if (brand && pipelines && pipelines.length) {
      return (
        <Layout title={brand.name}>
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
              {pipelines.map((pipeline) => (
                <Link
                  href={`/miniprogram/${brand.id}?pipelineId=${pipeline.id}`}
                  key={pipeline.id}
                >
                  <a
                    className={`btn ${
                      pipeline.id == pipelineId ? "btn-primary" : ""
                    }`}
                  >
                    {pipeline.name}
                  </a>
                </Link>
              ))}

              <hr />

              {deploys?.map((deploy) => {
                return <MiniProgramDeploy key={deploy.id} deploy={deploy} />;
              })}
            </div>
          </div>
        </Layout>
      );
    }

    return (
      <Layout title="Empty">
        <ResponseEmpty message={errors} />
      </Layout>
    );
  }
}

export default MiniProgramPage;

export const getServerSideProps: GetServerSideProps = async ({
  params,
  query,
}) => {
  try {
    const id = params?.id as string;
    const brandId = +id;

    const brand = BRANDS.find((brand) => brand.id === brandId);

    if (brand === undefined) {
      return { props: { brand, pipelines: [] } };
    }

    const { data: pipelines } = await getPipelines({ project_id: brandId });

    if (pipelines && pipelines.length) {
      const pipelineId = (query?.pipelineId as string) || pipelines[0].id;

      try {
        const { data: deploys } = await getPipelineDeploys(pipelineId);

        return { props: { brand, pipelines, deploys, pipelineId } };
      } catch (error) {
        return { props: { errors: error.message } };
      }
    }

    return { props: { brand, pipelines } };
  } catch (error) {
    return { props: { errors: error.message } };
  }
};
