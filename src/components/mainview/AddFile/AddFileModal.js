import React from "react";
import { withRouter } from "react-router-dom";
import styles from "./AddFileModal.module.css";
import CloseIcon from "../../../images/closeIcon.svg";
import { checkDuplicateFiles } from "../../../utils/helperFunctions";
class AddModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
      switch: "folder",
      name: "",
      creator: "",
      size: 0,
      date: ""
    };
  }

  restrictFutureDate = date => {
    const curMonth = parseInt(date.getMonth() + 1, 10);
    const curDay = parseInt(date.getDate(), 10);
    const curYear = date.getFullYear();
    let formattedDate =
      curYear +
      "-" +
      (curMonth < 10 ? "0" + curMonth : curMonth) +
      "-" +
      (curDay < 10 ? "0" + curDay : curDay);
    return formattedDate;
  };

  handleChange = (e, type) => {
    this.setState({ [type]: e.target.value });
  };

  selectedSwitch = val => {
    this.setState({ switch: val });
  };

  addData = () => {
    const { FileSystem, location } = this.props;
    const { pathname } = location;
    const { name } = this.state;
    if (checkDuplicateFiles(name, FileSystem, pathname))
      alert("Duplicate Files/Folder naming");
    else {
      let newData = {
        name: this.state.name,
        size: this.state.size,
        createdBy: this.state.creator,
        date: this.state.date,
        type: this.state.switch,
        children: [],
        parentPath:
          "Root" +
          `${
            this.props.location.pathname === "/"
              ? ""
              : this.props.location.pathname
          }`
      };
      this.props.addData(newData);
    }
  };

  render() {
    const { modal, toggle } = this.props;
    return (
      <div
        ref={this.container}
        className={modal ? styles.modalOpen : styles.modalClose}
      >
        <img
          alt="CLOSE"
          src={CloseIcon}
          className={styles.modalToggler}
          onClick={toggle}
        />

        <div className={styles.modalBody}>
          <div className={styles.heading}>{"Create New"}</div>
          <div className={styles.switch}>
            <div className={styles.switchContainer}>
              <div
                className={
                  this.state.switch === "file"
                    ? `${styles.switchOptions} ${styles.selected}`
                    : styles.switchOptions
                }
                onClick={() => this.selectedSwitch("file")}
              >
                File
              </div>
              <div
                className={
                  this.state.switch === "folder"
                    ? `${styles.switchOptions} ${styles.selected}`
                    : styles.switchOptions
                }
                onClick={() => this.selectedSwitch("folder")}
              >
                Folder
              </div>
            </div>
          </div>
          <div className={styles.inputContainer}>
            <input
              className={styles.input}
              placeholder="Name"
              type="text"
              value={this.state.name}
              onChange={e => this.handleChange(e, "name")}
            />
          </div>
          <div className={styles.inputContainer}>
            <input
              className={styles.input}
              placeholder="Creator"
              type="text"
              value={this.state.creator}
              onChange={e => this.handleChange(e, "creator")}
            />
          </div>
          <div className={styles.inputContainer}>
            <input
              className={styles.input}
              placeholder="Size"
              type="number"
              value={this.state.size}
              onChange={e => this.handleChange(e, "size")}
            />
          </div>
          <div className={styles.inputContainer}>
            <input
              className={styles.input}
              placeholder="Date"
              type="date"
              max={this.restrictFutureDate(new Date())}
              value={this.state.date}
              onChange={e => this.handleChange(e, "date")}
            />
          </div>
          <div className={styles.inputContainer}>
            <button
              className={styles.button}
              disabled={
                !this.state.name || !this.state.date || !this.state.creator
              }
              onClick={this.addData}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(AddModal);
