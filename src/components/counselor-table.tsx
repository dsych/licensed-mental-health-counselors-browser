import React, { RefObject } from "react";
import { Column, Table } from "react-virtualized";

import Search from "./search";
import { Practitioner, instanceOfAddress, instanceOfPhone } from "./practitioner";
import AddressComponent from "./address";
import PhoneComponent from "./phone";

interface CounselorTableProps {
  data: Practitioner[];
}

interface CounselorTableState {
  filteredData: Practitioner[];
}

export default class CounselorTable extends React.Component<
  CounselorTableProps,
  CounselorTableState
  > {
  props: CounselorTableProps;
  state: CounselorTableState = { filteredData: this.props.data };
  wrapper: RefObject<HTMLDivElement> = React.createRef();

  rowGetter = ({ index }) => this.state.filteredData[index];

  cellRenderer = ({ isScrolling, rowData, dataKey }) => {
    let rc;
    if (instanceOfAddress(rowData[dataKey])) {
      rc = <div><AddressComponent address={rowData[dataKey]} ></AddressComponent></div>
    } else if (instanceOfPhone(rowData[dataKey])) {
      rc = <div><PhoneComponent phone={rowData[dataKey]} ></PhoneComponent></div>
    } else {
      rc = <div style={{ whiteSpace: "normal" }}>{rowData[dataKey]}</div>;
    }
    return rc;
  };

  updateData = list => {
    this.setState({ filteredData: list || this.props.data });
  };

  render() {
    const { filteredData } = this.state;

    // @TODO: Implement category (Header) searching
    // headers.filter(Boolean).map(header => {
    //   console.log("LABEL_MAPPING[header]", LABEL_MAPPING[header]);
    // });
    return (
      <div ref={this.wrapper} className="table">
        <div>
          <Search updateData={this.updateData} headers={Object.keys(Practitioner.LABEL_INFO).map(header => Practitioner.LABEL_INFO[header].queryString)} />
        </div>
        <div>
          <h4>{filteredData.length} counselors found</h4>
        </div>
        <Table
          width={Practitioner.getTotalWidth()}
          headerHeight={40}
          height={400}
          rowHeight={60}
          rowCount={filteredData.length}
          rowGetter={this.rowGetter}
        >
          {Object.keys(Practitioner.LABEL_INFO).map(header => {
            /**
             * Generate a column for the table.
             * counselor is an array of strings, each referring to a header specified from the headers array.
             */
            return (
              <Column
                key={header}
                cellRenderer={this.cellRenderer}
                dataKey={header}
                label={Practitioner.LABEL_INFO[header].heading}
                width={Practitioner.LABEL_INFO[header].width}
              />
            );
          })}
        </Table>
      </div>
    );
  }
}
