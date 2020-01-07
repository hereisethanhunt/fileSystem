import { ADD_ENTRY, DELETE_ENTRY } from "../utils/constants";
import { deleteAllChildren } from "../utils/helperFunctions";

export default function(state = {}, action) {
  switch (action.type) {
    case ADD_ENTRY: {
      const newEntry = action.payload[0];
      const key = action.payload[1];
      let parent = newEntry[key].parentPath;
      const newState = { ...state };

      let eachPath = parent.split("/");
      if (eachPath.length > 2)
        parent =
          eachPath[eachPath.length - 2] + "/" + eachPath[eachPath.length - 1];

      newState[parent].children.push(key); // adding the new key to its parents children array
      let newData = {
        ...newState,
        ...newEntry
      };
      localStorage.setItem("FileSystem", JSON.stringify(newData));
      return { ...newData };
    }
    case DELETE_ENTRY: {
      const deleteEntry = action.payload;
      let childDeleted = deleteAllChildren({ ...state }, deleteEntry);

      let parentOfDeleteEntry = childDeleted[deleteEntry].parentPath;
      let eachPath = parentOfDeleteEntry.split("/");
      if (eachPath.length > 2)
        parentOfDeleteEntry =
          eachPath[eachPath.length - 2] + "/" + eachPath[eachPath.length - 1];

      const {
        [deleteEntry]: parentValue,
        ...dataWithoutDeleteEntry
      } = childDeleted;

      var deleteKeyFromParent =
        dataWithoutDeleteEntry[parentOfDeleteEntry].children;
      var index = deleteKeyFromParent.indexOf(deleteEntry);
      if (index > -1) {
        deleteKeyFromParent.splice(index, 1);
      }
      localStorage.setItem(
        "FileSystem",
        JSON.stringify(dataWithoutDeleteEntry)
      );
      return { ...dataWithoutDeleteEntry };
    }
    default:
      return state;
  }
}
