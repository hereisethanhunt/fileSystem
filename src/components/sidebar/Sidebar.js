import React from "react";
import { withRouter } from "react-router-dom";
import styles from "./Sidebar.module.css";
import RenderDropdown from "./RenderDropdown";

class Sidebar extends React.Component {
  goToRoot = () => {
    this.props.history.push("/");
  };

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.root} onClick={this.goToRoot}>
          ROOT
        </div>
        <div className={styles.dropdown}>
          <RenderDropdown FileSystem={this.props.FileSystem} keys="Root" />
        </div>
      </div>
    );
  }
}

export default withRouter(Sidebar);
