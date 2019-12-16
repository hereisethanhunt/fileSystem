import { ADD_ENTRY, DELETE_ENTRY } from "../utils/constants";
import { deleteAllChildren } from "../utils/helperFunctions";

export default function(state = {}, action) {
  switch (action.type) {
    case ADD_ENTRY:
      const newEntry = action.payload[0];
      const key = action.payload[1];
      let parent = newEntry[key].parentPath;
      const newState = { ...state };

      let eachP = parent.split("/");
      if (eachP.length > 2)
        parent = eachP[eachP.length - 2] + "/" + eachP[eachP.length - 1];

      newState[parent].children.push(key);
      let newData = {
        ...newState,
        ...newEntry
      };
      localStorage.setItem("FileSystem", JSON.stringify(newData));
      return { ...newData };

    case DELETE_ENTRY:
      const deleteEntry = action.payload;
      let childDeleted = deleteAllChildren({ ...state }, deleteEntry);

      let parentRoute = childDeleted[deleteEntry].parentPath;
      let eachPath = parentRoute.split("/");
      if (eachPath.length > 2)
        parentRoute =
          eachPath[eachPath.length - 2] + "/" + eachPath[eachPath.length - 1];

      const {
        [deleteEntry]: parentValue,
        ...currentDataDeleted
      } = childDeleted;
      var deleteCurrentFromParent = currentDataDeleted[parentRoute].children;
      var index = deleteCurrentFromParent.indexOf(deleteEntry);
      if (index > -1) {
        deleteCurrentFromParent.splice(index, 1);
      }
      localStorage.setItem("FileSystem", JSON.stringify(currentDataDeleted));
      return { ...currentDataDeleted };

    default:
      return state;
  }
}
