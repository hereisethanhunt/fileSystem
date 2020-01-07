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
      routesList: this.getRouteList(this.props.FileSystem),
      fileSys: []
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

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.FileSystem !== prevState.FileSystem) {
      return { fileSys: nextProps.FileSystem };
    } else return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.FileSystem !== this.props.FileSystem) {
      this.setState({ routesList: this.getRouteList(this.state.fileSys) });
    }
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
          // for file, show parent
          this.props.history.push(pathToChild);
        // for folder, go inside
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
