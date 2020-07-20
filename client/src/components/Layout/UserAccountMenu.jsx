import React, { useState } from "react";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MaterialLink from "@material-ui/core/Link";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";

function UserAccountMenu({ data }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        keepMounted
        transformOrigin={{
          vertical: -60,
          horizontal: "center",
        }}
        open={open}
        onClose={handleClose}
      >
        {data.map((item) => (
          <MenuItem key={item.name} onClick={handleClose}>
            <Link style={{ textDecoration: "none" }} to={item.link}>
              {item.name}
            </Link>
          </MenuItem>
        ))}
        <MenuItem onClick={handleClose}>
          <MaterialLink underline="none" href="/logout">
            Logout
          </MaterialLink>
        </MenuItem>
      </Menu>
    </>
  );
}

export default UserAccountMenu;
