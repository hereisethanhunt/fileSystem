import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import styles from "./RenderDropdown.module.css";

class RenderDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: {}
    };
  }

  toggle = name => {
    let newValue = !this.state.modal[name];
    let newObj = { ...this.state.modal, [name]: newValue };
    this.setState({ modal: newObj });
  };

  renderPage = (FileSystem, e) => {
    let parent = FileSystem[e].parentPath;
    let child = FileSystem[e].name;

    if (FileSystem[e].type === "file") {
      // for files go to parent view
      if (FileSystem[e].parentPath === null) this.props.history.push("/");
      else if (FileSystem[e].parentPath === "Root")
        this.props.history.push("/");
      else {
        let pathToChild = parent.substring(parent.indexOf("/"), parent.length);
        this.props.history.push(pathToChild);
      }
    } else {
      // for folder go inside
      if (FileSystem[e].parentPath === null) this.props.history.push("/");
      else if (FileSystem[e].parentPath === "Root")
        this.props.history.push("/" + child);
      else {
        let pathToChild = parent.substring(parent.indexOf("/"), parent.length);
        this.props.history.push(pathToChild + "/" + child);
      }
    }
  };

  render() {
    const { FileSystem, keys } = this.props;

    return (
      <div>
        {FileSystem &&
          FileSystem[keys] &&
          FileSystem[keys].children.map(e => {
            return (
              <Fragment key={FileSystem[e].name}>
                <div
                  className={styles.hover}
                  onClick={() => this.renderPage(FileSystem, e)}
                >
                  {FileSystem[e].name}
                  {FileSystem[e].children.length ? (
                    <span
                      onClick={() => {
                        this.toggle(FileSystem[e].name);
                      }}
                    >
                      {this.state.modal[FileSystem[e].name] ? (
                        <i className="fas fa-chevron-up"></i>
                      ) : (
                        <i className="fas fa-chevron-down"></i>
                      )}
                    </span>
                  ) : null}
                </div>

                {this.state.modal[FileSystem[e].name] === true ? (
                  <RenderDropdown
                    keys={e}
                    FileSystem={FileSystem}
                    history={this.props.history}
                  />
                ) : null}
              </Fragment>
            );
          })}
      </div>
    );
  }
}

export default withRouter(RenderDropdown);
