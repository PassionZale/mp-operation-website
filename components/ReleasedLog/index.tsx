import React from "react";

type Props = {
  brandId: null | number
}

type State = {}

class ReleasedLog extends React.Component<Props, State> {
  constructor(props: Props){
    super(props)
  }

  // TODO Watch props.brandId changed

  render() {
    return (
      <div> {this.props.brandId} released log </div>
    )
  }
}

export default ReleasedLog