import { InferGetStaticPropsType } from "next";
import Layout from "@components/Layout/index";
import MiniProgramCard from "@components/MiniProgramCard/index";
import { getProjects } from "@services/index";
import { IProject } from "@interfaces/project.interface";

function chunk<T>(arr: Array<T>, chunkSize: number): Array<Array<T>> {
  return arr.reduce((prevVal: any, _: any, currIndx: number, array: Array<T>) =>
    !(currIndx % chunkSize) ?
    prevVal.concat([array.slice(currIndx, currIndx + chunkSize)]) :
    prevVal, []);
}

export const getStaticProps = async () => {
  try {
    const { data } = await getProjects();

    return {
      props: {
        projects: data,
      },
    };
  } catch (error) {
    return { props: { projects: [] } };
  }
};

const IndexPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ projects }) => {
  const chunks = chunk<IProject>(projects, 3)

  return (
    <Layout title="首页">
      <div className="main">
        <div className="container-fluid">
          <img src="/images/logo.png" />
          {
            chunks.map((projects, index) => (
              <div className="flex-center" style={{ marginTop: 100 }} key={index}>
                {projects.map((project) => (
                  <div className="unit" key={project.id}>
                    <MiniProgramCard {...project} />
                  </div>
                ))}
              </div>
            ))
          }
        </div>
      </div>
    </Layout>
  )
};

export default IndexPage;
