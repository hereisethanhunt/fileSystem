import React from "react";
import { withRouter } from "react-router-dom";
import styles from "./SearchView.module.css";
import Select from "react-select";

import {
  goToParent,
  getCurrentPath,
  getParentPath
} from "../../utils/helperFunctions";

class SearchView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      routesList: this.getRouteList(this.props.FileSystem)
    };
  }

  getRouteList = system => {
    let arrData = [];
    let list = Object.keys(system);
    list.forEach(data => {
      arrData.push({
        label: data,
        value: data
      });
    });
    return arrData;
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({ routesList: this.getRouteList(nextProps.FileSystem) });
  }

  onSelectRoute = value => {
    this.setState({ selectedRoute: value });
    // if selected from dropdown
    if (!!value) {
      if (value.value === "Root") this.props.history.push("/");
      else {
        let parent = "";
        if (this.props.FileSystem[value.value].parentPath !== "Root") {
          parent = this.props.FileSystem[value.value].parentPath;
        }
        let child = this.props.FileSystem[value.value].name;
        let pathToChild = parent.substring(parent.indexOf("/"), parent.length);
        if (this.props.FileSystem[value.value].type === "file")
          // for file show parent
          this.props.history.push(pathToChild);
        // for folder go inside
        else this.props.history.push(pathToChild + "/" + child);
      }
    }
    // if cleared from dropdown
    else this.props.history.push("/");
  };

  goToParent = () => {
    let truePath = goToParent(this.props.location.pathname);
    this.props.history.push(truePath);
  };

  render() {
    const pathname = this.props.location.pathname;
    return (
      <div className={styles.container}>
        <i
          className={"fas fa-arrow-circle-up " + styles.icon}
          onClick={this.goToParent}
        ></i>
        <div className={styles.pathName}>
          <span>{getParentPath(pathname)}</span>{" "}
          <span className={styles.currentPath}>{getCurrentPath(pathname)}</span>
        </div>
        <div className={styles.searchRoutes}>
          <Select
            isClearable={true}
            isSearchable={true}
            options={this.state.routesList}
            value={this.state.selectedRoute}
            placeholder="Search or select a Route"
            autoBlur={true}
            onChange={this.onSelectRoute}
            className={styles.select}
            isDisabled={this.state.disableButton === true ? true : false}
          ></Select>
        </div>
      </div>
    );
  }
}

export default withRouter(SearchView);
