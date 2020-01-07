import React from "react";
import { withRouter } from "react-router-dom";
import styles from "./File.module.css";
import FileIcon from "../../../images/file.png";
import FolderIcon from "../../../images/folder.png";
import Modal from "./Modal";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { deleteFromSystem } from "../../../actions";

class File extends React.Component {
  ref = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      dropdown: false
    };
  }

  handleClick = (e, data) => {
    if (e.type === "click") this.openFolder(data);
    else if (e.type === "contextmenu") this.toggleDropdown();
  };

  handleClickOutside = event => {
    if (this.ref.current && !this.ref.current.contains(event.target))
      this.toggleDropdown();
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  toggle = () => {
    this.setState(function(prevState) {
      return { modal: !prevState.modal };
    });
  };

  toggleDropdown = () => {
    this.setState(function(prevState) {
      return { dropdown: !prevState.dropdown };
    });
  };

  openFolder = data => {
    if (data.type === "folder") {
      let path = data.parentPath + "/" + data.name;
      let goToPath = path.replace("Root", "");
      this.props.history.push(goToPath);
    } else this.toggle();
  };

  deleteData = (FileSystem, data) => {
    this.props.deleteFromSystem(data);
  };

  render() {
    const { FileSystem, data } = this.props;
    return (
      <div className={styles.container}>
        <div
          className={styles.image}
          onClick={e => this.handleClick(e, FileSystem[data])}
          onContextMenu={e => this.handleClick(e, FileSystem[data])}
        >
          {FileSystem[data].type === "file" ? (
            <img alt="FILE" src={FileIcon} />
          ) : (
            <img alt="FOLDER" src={FolderIcon} />
          )}
        </div>
        <div className={styles.heading}>{FileSystem[data].name}</div>

        {this.state.modal ? (
          <Modal
            data={FileSystem[data]}
            modal={this.state.modal}
            toggle={this.toggle}
          />
        ) : null}

        {this.state.dropdown ? (
          <div
            className={
              this.state.dropdown ? styles.dropdownOpen : styles.dropdownClose
            }
            ref={this.ref}
          >
            <div className={styles.dropdownBody}>
              <div onClick={this.toggle}>File Info</div>
              <div onClick={() => this.openFolder(FileSystem[data])}>Open</div>
              <div onClick={() => this.deleteData(FileSystem, data)}>
                Delete
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ deleteFromSystem }, dispatch);
}

export default connect(null, mapDispatchToProps)(withRouter(File));
