import { Address } from "./practitioner";
import React from "react";

interface AddressComponentProps {
  address: Address;
}

export default class AddressComponent extends React.Component<
  AddressComponentProps
> {
  render() {
    return (
      <span>
        <span>{this.props.address.line1}</span>
        <br />
        {this.props.address.line2 && (
          <span>
            {this.props.address.line2} <br />
          </span>
        )}
        <span>
          {this.props.address.city}, {this.props.address.state}
          {this.props.address.ZIP}
        </span>
      </span>
    );
  }
}
