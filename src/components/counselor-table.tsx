import React, { RefObject } from "react";
import { Column, Table } from "react-virtualized";

import Search from "./search";

interface CounselorTableProps {
  headers: string[];
  data: string[][];
}

interface CounselorTableState {
  filteredData: string[][];
}

export const LABEL_MAPPING = {
  lic_id: "Lic. ID",
  "Expire-Date": "Expiry Date",
  "Original-Date": "Original Date",
  "License-Number": "Lic. #",
  "Status-Effective-Date": "Effective Date",
  "Board-Action-Indicator": "Board Action?",
  "License-Status-Description": "License Status",
  "Last-Name": "Last",
  "First-Name": "First",
  "Middle-Name": "Middle",
  "Name-Suffix": "Suffix",
  "Business-Name": "Business",
  "License-Active-Status-Description": "Active?",
  County: "County Num",
  "County-Description": "County Name",
  "Mailing-Address-Line1": "Mailing Address",
  "Mailing-Address-line2": "Mailing Address line 2",
  "Mailing-Address-City": " Mailing City",
  "Mailing-Address-State": "Mailing State",
  "Mailing-Address-ZIPcode": "Mailing ZIP",
  "Mailing-Address-Area-Code": "Mailing Area-code",
  "Mailing-Address-Phone-Number": "Mailing Phone Num",
  "Mailing-Address-Phone-Extension": "Mailing Ext.",
  "Practice-Location-Address-Line1": "Practice Address",
  "Practice-Location-Address-line2": "Practice Address Line 2",
  "Practice-Location-Address-City": "Practice City",
  "Practice-Location-Address-State": "Practice State",
  "Practice-Location-Address-ZIPcode": "Practice ZIP",
  Email: "Email",
  "Mod-Cdes": "Mod Codes",
  "Prescribe-Ind": "Prescribe?",
  "Dispensing-Ind": "Dispensing?"
};

const WIDTH_MAPPING = {
  lic_id: 80,
  "Expire-Date": 120,
  "Original-Date": 120,
  "License-Number": 80,
  "Status-Effective-Date": 120,
  "Board-Action-Indicator": 150,
  "License-Status-Description": 140,
  "Last-Name": 140,
  "First-Name": 140,
  "Middle-Name": 80,
  "Name-Suffix": 60,
  "Business-Name": 80,
  "License-Active-Status-Description": 80,
  County: 40,
  "County-Description": 140,
  "Mailing-Address-Line1": 300,
  "Mailing-Address-line2": 300,
  "Mailing-Address-City": 200,
  "Mailing-Address-State": 130,
  "Mailing-Address-ZIPcode": 110,
  "Mailing-Address-Area-Code": 180,
  "Mailing-Address-Phone-Number": 180,
  "Mailing-Address-Phone-Extension": 120,
  "Practice-Location-Address-Line1": 300,
  "Practice-Location-Address-line2": 300,
  "Practice-Location-Address-City": 200,
  "Practice-Location-Address-State": 130,
  "Practice-Location-Address-ZIPcode": 110,
  Email: 240,
  "Mod-Cdes": 200,
  "Prescribe-Ind": 110,
  "Dispensing-Ind": 120
};

const TABLE_WIDTH = Object.keys(WIDTH_MAPPING).reduce(
  (total, key) => total + WIDTH_MAPPING[key],
  0
);

export default class CounselorTable extends React.Component<
  CounselorTableProps,
  CounselorTableState
> {
  props: CounselorTableProps;
  state: CounselorTableState = { filteredData: this.props.data };
  wrapper: RefObject<HTMLDivElement> = React.createRef();

  rowGetter = ({ index }) => this.state.filteredData[index];

  cellRenderer = ({ columnIndex, isScrolling, rowData }) => (
    <div style={{ whiteSpace: "normal" }}>{rowData[columnIndex]}</div>
  );

  updateData = list => {
    this.setState({ filteredData: list || this.props.data });
  };

  render() {
    const { headers } = this.props;
    const { filteredData } = this.state;

    // @TODO: Implement category (Header) searching
    // headers.filter(Boolean).map(header => {
    //   console.log("LABEL_MAPPING[header]", LABEL_MAPPING[header]);
    // });

    return (
      <div ref={this.wrapper} className="table">
        <div>
          <Search updateData={this.updateData} headers={headers} />
        </div>
        <div>
          <h4>{filteredData.length} counselors found</h4>
        </div>
        <Table
          width={TABLE_WIDTH}
          headerHeight={40}
          height={400}
          rowHeight={40}
          rowCount={filteredData.length}
          rowGetter={this.rowGetter}
        >
          {headers.map(header => {
            /**
             * Generate a column for the table.
             * counselor is an array of strings, each referring to a header specified from the headers array.
             */
            return (
              <Column
                key={header}
                cellRenderer={this.cellRenderer}
                dataKey={header}
                label={LABEL_MAPPING[header]}
                width={WIDTH_MAPPING[header]}
              />
            );
          })}
        </Table>
      </div>
    );
  }
}
