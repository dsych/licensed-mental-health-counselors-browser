import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import CounselorTable from './components/counselor-table';

interface AppState {
  updated: string;
  data: object[];
}
export default class App extends React.Component {
  async componentDidMount() {
    // Fetch data from database
    const response = await axios.get('/data');

    // Parse data:
    const { data, updated } = response;

    this.setState({
      data,
      updated,
    });
  }

  render() {
    const { updated, data } = this.state;

    return (
      <h1>
        Florida Licensed Mental Health Counselors{' '}
        <small>(Last Updated: {updated})</small>
        <div className='table'>
          <CounselorTable
        </div>
      </h1>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
