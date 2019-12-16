import { ADD_ENTRY, DELETE_ENTRY } from "../utils/constants";

export function deleteFromSystem(values) {
  return {
    type: DELETE_ENTRY,
    payload: values
  };
}

export function addToSystem(values, key) {
  return {
    type: ADD_ENTRY,
    payload: [values, key]
  };
}
