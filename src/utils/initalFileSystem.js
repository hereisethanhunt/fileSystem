const FileSystem = {
  Root: {
    name: "Root",
    size: 0,
    createdBy: "Vishal",
    type: "folder",
    date: "2019-12-13",
    parentPath: null,
    children: ["Root/Movies", "Root/Music", "Root/profile.pdf"]
  },
  "Root/Movies": {
    name: "Movies",
    size: 0,
    createdBy: "Vishal",
    type: "folder",
    date: "2019-12-13",
    parentPath: "Root",
    children: ["Movies/inception.mp4", "Movies/SciFic"]
  },
  "Movies/inception.mp4": {
    name: "inception.mp4",
    size: 2330,
    createdBy: "Vishal",
    type: "file",
    date: "2019-12-13",
    parentPath: "Root/Movies",
    children: []
  },
  "Movies/SciFic": {
    name: "SciFic",
    size: 2330,
    createdBy: "Vishal",
    type: "folder",
    date: "2019-12-13",
    parentPath: "Root/Movies",
    children: ["SciFic/terminator.mp4"]
  },
  "SciFic/terminator.mp4": {
    name: "terminator.mp4",
    size: 2330,
    createdBy: "Vishal",
    type: "file",
    date: "2019-12-13",
    parentPath: "Root/Movies/SciFic",
    children: []
  },
  "Root/Music": {
    name: "Music",
    size: 0,
    createdBy: "Vishal",
    type: "folder",
    date: "2019-12-13",
    parentPath: "Root",
    children: []
  },
  "Root/profile.pdf": {
    name: "profile.pdf",
    size: 10,
    createdBy: "Vishal",
    type: "file",
    date: "2019-12-13",
    parentPath: "Root",
    children: []
  }
};

const LoadInitialFileSystem = () => {
  localStorage.setItem("FileSystem", JSON.stringify(FileSystem));
  return FileSystem;
};

export default LoadInitialFileSystem;
