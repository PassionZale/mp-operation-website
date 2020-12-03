import { IDeploy } from "@interfaces/deploy.interface";
import React from "react";

type Props = {
  deploys: IDeploy[]
}

type State = {}

class ReleasedLog extends React.Component<Props, State> {
  constructor(props: Props){
    super(props)
  }

  render() {
    return (
      <div> {this.props.deploys} released log </div>
    )
  }
}

export default ReleasedLog