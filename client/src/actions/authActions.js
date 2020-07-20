import http from "../services/httpService";
import auth from "../services/authService";
import { saveUser } from "../services/userService";
import { setLoading, unSetLoading } from "./uiActions";
import { SET_CURRENT_USER } from "./types";
import toastify from "../utils/toastNotification";

// Register User
export const registerUser = (user) => (dispatch) => {
  dispatch(setLoading());
  saveUser(user).then(
    (res) => {
      toastify(res.data, "success");
      dispatch(unSetLoading());
    },
    (err) => {
      if (err.response && err.response.status === 400) {
        toastify(err.response.data, "error");
      }
      dispatch(unSetLoading());
    }
  );
};

// Login User
export const loginUser = ({ email, password }) => (dispatch) => {
  dispatch(setLoading());
  auth.login(email, password).then(
    (res) => {
      dispatch(unSetLoading());
      window.location = "/user";
    },
    (err) => {
      if (
        (err.response && err.response.status === 400) ||
        err.response.status === 401
      ) {
        toastify(err.response.data, "error");
      }
      dispatch(unSetLoading());
    }
  );
};

// Set logged in User
export const setCurrentUser = (user) => ({
  type: SET_CURRENT_USER,
  payload: user,
});

// LogOut User
export const logoutUser = () => (dispatch) => {
  auth.logout();

  // Remove jwt token from http headers
  http.setJwt(false);

  // Set current user to empty object
  dispatch(setCurrentUser({}));
};
