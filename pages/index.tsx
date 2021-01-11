import { InferGetStaticPropsType } from "next";
import getConfig from "next/config";
import Error from "next/error";
import Layout from "@components/Layout/index";
import MiniProgramCard from "@components/MiniProgramCard/index";
import { getProjects } from "@services/index";
import { IProject } from "@interfaces/project.interface";
import { IBaseResponse } from "@interfaces/base-response.interface";

const { publicRuntimeConfig} = getConfig();

function chunk<T>(arr: Array<T>, chunkSize: number): Array<Array<T>> {
  return arr.reduce(
    (prevVal: any, _: any, currIndx: number, array: Array<T>) =>
      !(currIndx % chunkSize)
        ? prevVal.concat([array.slice(currIndx, currIndx + chunkSize)])
        : prevVal,
    []
  );
}

type Props = {
  props: {
    projects?: IProject[];
    error?: IBaseResponse;
  };
};

export const getStaticProps = async (): Promise<Props> => {
  try {
    const { data } = await getProjects();

    return {
      props: {
        projects: data,
      },
    };
  } catch (error) {
    return { props: { error } };
  }
};

const IndexPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  projects,
  error,
}) => {
  if (error) {
    return <Error statusCode={500} title={error.message} />;
  }

  if (projects && projects.length) {
    const chunks = chunk<IProject>(projects, 3);

    return (
      <Layout title="首页">
        <div className="main">
          <div className="container-fluid">
            <img style={{width: 206, height: 'auto'}} src={`${publicRuntimeConfig.basePath}/images/lzsk.png`} />
            {chunks.map((projects, index) => (
              <div
                className="flex-center"
                style={{ marginTop: 100 }}
                key={index}
              >
                {projects.map((project) => (
                  <div className="unit" key={project.id}>
                    <MiniProgramCard {...project} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </Layout>
    );
  } else {
    return <Error statusCode={404} />;
  }
};

export default IndexPage;
