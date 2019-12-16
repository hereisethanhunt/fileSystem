import React from "react";
import { withRouter } from "react-router-dom";
import styles from "./Sidebar.module.css";

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
        <div className={styles.dropdown}></div>
      </div>
    );
  }
}

export default withRouter(Sidebar);
