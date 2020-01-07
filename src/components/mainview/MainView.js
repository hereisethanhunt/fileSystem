import React from "react";
import { withRouter } from "react-router-dom";
import styles from "./MainView.module.css";
import {
  loadCurrentRouteData,
  getCurrentPath
} from "../../utils/helperFunctions";
import File from "../File";
import AddItem from "../../images/addItem.png";
import Modal from "./AddModal";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addToSystem } from "../../actions";

class MainView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
  }

  toggle = () => {
    this.props.backdrop(!this.state.modal);
    this.setState(function(prevState) {
      return { modal: !prevState.modal };
    });
  };

  componentDidMount() {
    // console.log(this.props.FileSystem);
  }

  handleClick = e => {
    if (e.type === "contextmenu") e.preventDefault();
  };

  addData = obj => {
    let key = getCurrentPath(this.props.location.pathname) + "/" + obj.name;
    let data = { [key]: obj };
    this.props.addToSystem(data, key);
    this.toggle();
  };

  render() {
    const { FileSystem, location } = this.props;
    const { pathname } = location;
    return (
      <div
        className={styles.container}
        onContextMenu={e => this.handleClick(e)}
      >
        {loadCurrentRouteData(FileSystem, pathname) &&
          loadCurrentRouteData(FileSystem, pathname).children.map(item => {
            return <File key={item} data={item} FileSystem={FileSystem} />;
          })}
        <div className={styles.addItem}>
          <img
            alt="ADD"
            src={AddItem}
            className={styles.addItemIcon}
            onClick={this.toggle}
          />
        </div>
        {this.state.modal ? (
          <Modal
            FileSystem={FileSystem}
            modal={this.state.modal}
            toggle={this.toggle}
            addData={this.addData}
          />
        ) : null}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addToSystem }, dispatch);
}

export default connect(null, mapDispatchToProps)(withRouter(MainView));
