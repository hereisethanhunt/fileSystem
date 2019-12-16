import React from "react";
import { withRouter } from "react-router-dom";
import styles from "./SearchView.module.css";

import {
  goToParent,
  getCurrentPath,
  getParentPath
} from "../../utils/helperFunctions";

class SearchView extends React.Component {
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
      </div>
    );
  }
}

export default withRouter(SearchView);
