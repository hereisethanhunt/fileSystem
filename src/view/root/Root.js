import React from "react";
import styles from "./Root.module.css";
import Sidebar from "../../components/sidebar";
import MainView from "../../components/mainview";
import SearchView from "../../components/searchview";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addToSystem } from "../../actions";
import { ifPathExists } from "../../utils/helperFunctions";

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backdrop: false
    };
  }

  componentDidMount() {
    let truePath = ifPathExists(
      this.props.FileSystem,
      this.props.location.pathname
    );

    if (!truePath) this.props.history.push("/");
  }

  backdrop = bool => {
    this.setState({ backdrop: bool });
  };

  render() {
    return (
      <div
        className={
          !this.state.backdrop ? styles.container : styles.openBackdrop
        }
      >
        <Sidebar />
        <div className={styles.views}>
          <SearchView />
          <MainView
            FileSystem={this.props.FileSystem}
            backdrop={this.backdrop}
          />
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addToSystem }, dispatch);
}

function mapStateToProps({ FileSystem }) {
  return { FileSystem };
}

export default connect(mapStateToProps, mapDispatchToProps)(Root);
