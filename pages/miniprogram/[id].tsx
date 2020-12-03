import React from "react";
import { GetServerSideProps } from "next";
import Layout from "@components/Layout/index";
import ResponseEmpty from "@components/Response/empty";
import ResponseError from "@components/Response/error";
import { getPipelines, getPipelineDeploys } from "@services/index";
import { IPipeline } from "@interfaces/pipeline.interface";
import { BRANDS, Brand } from "@constants/brands.constant";
import BrandPipelineSelect from "@components/BrandPipelineSelect/index";
import ReleasedLog from "@components/ReleasedLog/index";
import { IDeploy } from "@interfaces/deploy.interface";
import axios from "axios"

type Props = {
  brand?: Brand;
  pipelines?: IPipeline[];
  errors?: string;
};

type State = {
  deploys: IDeploy[]
};

class MiniProgramPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  state = {
    deploys: []
  }

  async handleBrandSelect(pipelineId: number) {
    try {
     const { data } = await getPipelineDeploys(pipelineId)

    //  const res = await fetch(`http://api.mp-operation.lovchun.com/v1/pipeline/${pipelineId}/deploys`)

    // const { data } = await axios.get(`http://api.mp-operation.lovchun.com/v1/pipeline/${pipelineId}/deploys`)
     
    //  this.setState({ deploys: data })
    } catch (error) {
      window.alert(error.message)
    }
  }

  render() {
    const { errors, brand, pipelines } = this.props;

    if (errors) {
      return (
        <Layout title="Error">
          <ResponseError message={errors} />
        </Layout>
      );
    }

    if (brand && pipelines && pipelines.length) {
      const { deploys } = this.state

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
              <BrandPipelineSelect brand={brand} pipelines={pipelines} onSelected={pipelineId => this.handleBrandSelect(pipelineId)}/>

              <ReleasedLog deploys={deploys} />
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

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const id = params?.id as string;
    const brandId = +id;

    const brand = BRANDS.find((brand) => brand.id === brandId);

    if (brand === undefined) {
      return { props: { items: [] } };
    }

    const { data } = await getPipelines({ project_id: brandId });

    return { props: { pipelines: data, brand } };
  } catch (error) {
    return { props: { errors: error.message } };
  }
};
