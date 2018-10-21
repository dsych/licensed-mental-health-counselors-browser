import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import formatDate from "date-fns/distance_in_words_to_now";

import CounselorTable from "./components/counselor-table";
import Practitioner from "./components/practitioner";

interface AppState {
  updated: string;
  data: Practitioner[];
}
export default class App extends React.Component<{}, AppState> {
  state: AppState = {
    updated: "",
    data: []
  };

  searchApi;

  async componentDidMount() {
    // Fetch data from database
    const response = await axios.get<AppState>("/data");
    const [headers, ...raw] = response.data.data;
    const updated = response.data.updated;

    const practitioners = raw.map(entry => new Practitioner(entry));

    this.setState({
      data: practitioners,
      updated
    });
  }

  filter = e => {
    const { value } = e.target;
  };

  render() {
    const { updated, data } = this.state;
    return (
      <>
        <h1>
          Florida Licensed Mental Health Counselors{" "}
          <small>
            (Last Updated:{" "}
            {updated ? formatDate(updated, { addSuffix: true }) : "Loading..."})
          </small>
        </h1>
        {data.length > 0 && <CounselorTable data={data} />}
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
