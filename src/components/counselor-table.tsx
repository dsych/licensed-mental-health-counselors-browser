import React from 'react';
import { Table } from 'react-virtualized';

interface CounselorTableProps {
  headers: string[];
  data: string[][];
}
export default class CounselorTable extends React.Component<
  CounselorTableProps
> {
  render() {
    const [headers, ...data] = this.props.data;
    return (
      <Table
        width={window.innerWidth}
        headerHeight={40}
        height={400}
        rowHeight={40}
        rowCount={data.length}
      />
    );
  }
}
