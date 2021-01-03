import { IBaseResponse } from "@interfaces/base-response.interface";
import { IDeployDetail } from "@services/dto/response/get-deploy.response.dto";
import { downloadMiniProgram, getDeploy } from "@services/index";
import { GetServerSideProps } from "next";
import Error from "next/error";
import Link from "next/link";
import React from "react";

type Props = {
  deploy?: IDeployDetail;
  error?: IBaseResponse;
};

type State = {
  isSupportDownload: boolean;
  downloadError: boolean;
  downloadProgress: "unstart" | "started" | "finished";
};

class DownloadPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isSupportDownload: true,
      downloadError: false,
      downloadProgress: "unstart",
    };
  }

  async componentDidMount() {
    const isSupportDownload = "download" in document.createElement("a");

    this.setState({ isSupportDownload });

    if (!isSupportDownload) return;

    const { deploy } = this.props;

    if (deploy) {
      try {
        this.setState({ downloadProgress: "started" });

        const response = await downloadMiniProgram({
          filePath: deploy.project_path,
        });

        const fileName = `${deploy.project.name}-${deploy.pipeline.name}-${deploy.version}-${deploy.id}.zip`;

        const blob = new Blob([response.data], { type: "application/zip" });

        const downloadUrl = URL.createObjectURL(blob);

        const a = document.createElement("a");

        a.href = downloadUrl;

        a.download = fileName;

        document.body.appendChild(a);

        a.click();

        this.setState({ downloadProgress: "finished" });
      } catch (error) {
        this.setState({ downloadError: true });
      }
    }
  }

  render() {
    const { error, deploy } = this.props;

    const { downloadError, downloadProgress, isSupportDownload } = this.state;

    if (error) {
      return <Error statusCode={500} title={error.message} />;
    }

    if (!deploy) {
      return <Error statusCode={404} />;
    }

    if (!isSupportDownload) {
      return (
        <p>
          抱歉，你的浏览器不支持 HTML5 下载，
          <Link
            href={{
              pathname: "/api/download",
              query: {
                filePath: deploy.project_path,
              },
            }}
          >
            <a className="text-primary" href="#">请点击此处手动下载</a>
          </Link>
        </p>
      );
    }

    if (downloadError) {
      return <Error statusCode={404} title="文件不存在" />;
    }

    let downloadProgressText = "";

    switch (downloadProgress) {
      case "started":
        downloadProgressText = "正在下载，请稍后...";
        break;

      case "finished":
        downloadProgressText = "下载完成，刷新页面可重新下载...";
        break;

      default:
        downloadProgressText = "正在查询源文件，请稍后...";
        break;
    }

    return <p>{downloadProgressText}</p>;
  }
}

export default DownloadPage;

type Query = {
  pipeline_id?: string;
  deploy_id?: string;
  id: string;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const query = context.query as Query;

    const { id, deploy_id, pipeline_id } = query;

    if (
      id === undefined ||
      deploy_id === undefined ||
      pipeline_id === undefined
    ) {
      return { props: {} };
    }

    const { data } = await getDeploy(deploy_id);

    return { props: { deploy: data } };
  } catch (error) {
    return { props: { error } };
  }
};
