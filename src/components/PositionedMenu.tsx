import { AccountCircle } from "@material-ui/icons";
import { IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { logout } from "../stores/session";
import { RootState } from "../stores/store";

const PositionedMenu = () => {
  const dispatch = useDispatch();
  const { isLoggedin } = useSelector((state: RootState) => state.session); // TODO: 하나씩으로 개선

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={handleClose}>
          <Link
            to={"/PersonalProfilePage"}
            style={{ textDecoration: "none", color: "black" }}
          >
            Profile
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link
            to="/QuantLabPage"
            style={{ textDecoration: "none", color: "black" }}
          >
            Quant Lab
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link
            to="/SettingsPage"
            style={{ textDecoration: "none", color: "black" }}
          >
            Settings
          </Link>
        </MenuItem>
        {isLoggedin ? (
          <MenuItem
            onClick={() => {
              dispatch(logout());
              handleClose();
            }}
            style={{ textDecoration: "none", color: "black" }}
          >
            Logout
          </MenuItem>
        ) : (
          <MenuItem onClick={handleClose}>
            <Link
              to="/LoginPage"
              style={{ textDecoration: "none", color: "black" }}
            >
              Login
            </Link>
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export default PositionedMenu;
