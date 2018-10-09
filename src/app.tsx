import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import formatDate from "date-fns/distance_in_words_to_now";

import CounselorTable from "./components/counselor-table";

interface AppState {
  headers: string[];
  updated: string;
  data: string[][];
}
export default class App extends React.Component<{}, AppState> {
  state: AppState = {
    updated: "",
    headers: [],
    data: []
  };

  searchApi;

  async componentDidMount() {
    // Fetch data from database
    const response = await axios.get<AppState>("/data");
    const [headers, ...data] = response.data.data;
    const updated = response.data.updated;

    this.setState({
      data,
      headers,
      updated
    });
  }

  filter = e => {
    const { value } = e.target;
  };

  render() {
    const { headers, updated, data } = this.state;
    return (
      <>
        <h1>
          Florida Licensed Mental Health Counselors{" "}
          <small>
            (Last Updated:{" "}
            {updated ? formatDate(updated, { addSuffix: true }) : "Loading..."})
          </small>
        </h1>
        {data.length > 0 && <CounselorTable data={data} headers={headers} />}
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
