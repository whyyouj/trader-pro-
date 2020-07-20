import React from "react";
import LoadingOverlay from "react-loading-overlay";
import { useSelector } from "react-redux";
import SideMenu from "./SideMenu";
import NavBar from "./NavBar";

const style = {
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  body: {
    display: "flex",
    flexGrow: 1,
  },
  content: {
    display: "flex",
    width: "100%",
    backgroundColor: "#EDE7F6",
    padding: 10,
  },
};

export default function ({ navItems, menuItems, children }) {
  const isLoading = useSelector((state) => state.uiState.isLoading);
  return (
    <>
      <div style={style.container}>
        <NavBar navItems={navItems} />
        <div style={style.body}>
          <SideMenu menuItems={menuItems} />
          <div style={style.content}>
            <LoadingOverlay active={isLoading} spinner>
              {children}
            </LoadingOverlay>
          </div>
        </div>
      </div>
    </>
  );
}
