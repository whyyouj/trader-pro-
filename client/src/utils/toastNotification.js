import store from "../store";
import { displayToast, hideToast, unSetLoading } from "../actions/uiActions";

const { dispatch } = store;

export default function (message, type) {
  dispatch(displayToast(message, type));
  dispatch(unSetLoading());
  setTimeout(() => dispatch(hideToast()), 5500);
}
