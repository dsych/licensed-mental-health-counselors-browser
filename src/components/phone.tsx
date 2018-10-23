import { Phone } from "./practitioner";
import React from "react";

interface PhoneComponentProps {
    phone: Phone;
}

export default class PhoneComponent extends React.Component<PhoneComponentProps> {
    render() {
        return <span>({this.props.phone.area}) {this.props.phone.phoneNum} {this.props.phone.phoneExt ? "x" + this.props.phone.phoneExt : ""}</span>
    }
}
