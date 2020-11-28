import Layout from "@components/Layout/index";
import MiniProgramCard from "@components/MiniProgramCard/index";
import { BRANDS } from "@constants/brands.constant";

const IndexPage: React.FC = () => (
  <Layout title="首页">
    <div className="main">
      <div className="container-fluid">
        <img src="/images/logo.png" />

        <div className="flex-center" style={{marginTop: 100}}>
          {BRANDS.map((brand) => (
            <div className="unit" key={brand.id}>
              <MiniProgramCard {...brand} />
            </div>
          ))}
        </div>
      </div>
    </div>
  </Layout>
);

export default IndexPage;
