import { ROOT } from "./constants";

export const checkDuplicateFiles = (name, fileSystem, pathname) => {
  let keyToCheck = getCurrentPath(pathname) + "/" + name;
  return Object.keys(fileSystem).find(
    key => key.toLowerCase() === keyToCheck.toLowerCase()
  );
};

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

export const deleteAllChildren = (fileSystem, key) => {
  let arrOfAllChildrenWithKey = getAllChildren(fileSystem, key, []);
  arrOfAllChildrenWithKey.forEach(e => {
    delete fileSystem[e];
  });
  return fileSystem;
};

function getAllChildren(obj, key, arr) {
  obj[key].children &&
    obj[key].children.forEach(element => {
      arr.push(element);
      getAllChildren(obj, element, arr);
    });

  return arr;
}
