import React from "react";
import axios from "axios";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { Practitioner } from "./practitioner";

interface SearchProps {
  headers: string[];
  updateData(data): void;
}

interface SearchState {
  queryMap: {
    [category: string]: string;
  };
}

export default class Search extends React.Component<SearchProps> {
  search$: Subject<any>;
  state: SearchState = {
    queryMap: {}
  };

  componentWillMount() {
    this.search$ = new Subject();
    this.search$.pipe(debounceTime(350)).subscribe(query =>
      axios({
        method: "search",
        url: "/data",
        data: {
          query
        }
      })
        .then(result => {
          this.props.updateData(result.data ? result.data.map(entry => new Practitioner(entry)) : null);
        })
        .catch(err => {
          alert("Error searching database");
          console.error(err);
        })
    );
  }

  componentWillUnmount() {
    if (this.search$) this.search$.unsubscribe();
  }

  search = e => {
    const query = e.target && e.target.value;

    if (query) {
      this.search$.next(query);
    } else {
      this.props.updateData(null);
    }
  };

  render() {
    return (
      <div>
        <label>
          <b>Search: </b>
          <input
            type="text"
            onChange={this.search}
            placeholder="Search for anything..."
          />
        </label>
      </div>
    );
  }
}
