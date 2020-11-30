import React from "react";
import { Brand } from "@constants/brands.constant";
import { IPipeline } from "@interfaces/pipeline.interface";

type Props = {
  brand: Brand;

  pipelines: IPipeline[];

  onSelected: (brandId: number) => void;
};

type State = {
  value: string;
};

class BrandPipelineSelect extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  state = {
    value: ""
  };

  handleSelectChange(event: React.FormEvent<HTMLSelectElement>) {
    const value = event.currentTarget.value;
    this.setState({ value });

    this.props.onSelected(+value);
  }

  render() {
    const { brand, pipelines } = this.props;
    const { value } = this.state

    return (
      <div className="form">
        <div className="flex-left units-gap">
          <label className="unit-0 text-right" style={{ minWidth: 100 }}>
            {brand.name}:
          </label>
          <div className="unit">
            <select value={value} onChange={ e => this.handleSelectChange(e) }>
              <option disabled value="">请选择流水线</option>
              {pipelines.map((item) => {
                return <option key={item.id} value={item.id}>{item.name}</option>;
              })}
            </select>
          </div>
        </div>
      </div>
    );
  }
}

export default BrandPipelineSelect;
