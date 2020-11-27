import Link from "next/link";
import Layout from "@components/Layout";
import { Row, Col } from "antd";

const IndexPage = () => (
  <Layout title="首页">
    <div className="main">
      <img src="/logo.png" />

      <Row>
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
          Col
        </Col>
        <Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }}>
          Col
        </Col>
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
          Col
        </Col>
      </Row>
    </div>
  </Layout>
);

export default IndexPage;
