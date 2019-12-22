import { ROOT } from "./constants";

export const ifPathExists = (fileSystem, path) => {
  if (path === "/") return true;
  else {
    let currFullPath = ROOT.concat(path);
    let parentPath = currFullPath.substring(0, currFullPath.lastIndexOf("/"));
    let eachPath = currFullPath.split("/");
    let keyToMatch =
      eachPath[eachPath.length - 2] + "/" + eachPath[eachPath.length - 1];
    if (
      fileSystem[keyToMatch] &&
      fileSystem[keyToMatch].parentPath === parentPath
    ) {
      if (fileSystem[keyToMatch].type === "folder") return true;
      else return false;
    } else return false;
  }
};

export const goToParent = path => {
  if (path === "/") return path;
  else {
    let goToPath = path.substring(0, path.lastIndexOf("/"));
    return goToPath;
  }
};

export const getCurrentPath = path => {
  if (path === "/") return ROOT;
  else {
    let currFullPath = ROOT.concat(path);
    let eachPath = currFullPath.split("/");
    let currentPath = eachPath[eachPath.length - 1];
    return currentPath;
  }
};

export const getParentPath = path => {
  if (path === "/") return null;
  else {
    let currFullPath = ROOT.concat(path);
    let parentPath = currFullPath.substring(0, currFullPath.lastIndexOf("/"));
    return parentPath.concat("/");
  }
};

export const loadCurrentRouteData = (fileSystem, path) => {
  if (path === "/") {
    let currFullPath = ROOT;
    return fileSystem[currFullPath];
  } else {
    let currFullPath = ROOT.concat(path);
    let eachPath = currFullPath.split("/");
    let keyToMatch =
      eachPath[eachPath.length - 2] + "/" + eachPath[eachPath.length - 1];
    return fileSystem[keyToMatch];
  }
};

export const deleteAllChildren = (obj, key) => {
  let arr = getAllChildren(obj, key, []);
  arr.forEach(e => {
    delete obj[e];
  });
  return obj;
};

function getAllChildren(obj, key, arr) {
  obj[key].children &&
    obj[key].children.forEach(element => {
      arr.push(element);
      getAllChildren(obj, element, arr);
    });

  return arr;
}
