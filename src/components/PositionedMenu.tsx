import { AccountCircle } from "@material-ui/icons";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { Link } from "react-router-dom";

const PositionedMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        color="inherit"
        sx={{
          mr: 1,
          ml: 1,
          "&:hover": { backgroundColor: "transparent" },
        }}
      >
        <AccountCircle />
      </Button>
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
            to={"/QuantLabPage"}
            style={{ textDecoration: "none", color: "black" }}
          >
            Quant Lab
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link
            to={"/SettingsPage"}
            style={{ textDecoration: "none", color: "black" }}
          >
            Settings
          </Link>
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          style={{ textDecoration: "none", color: "black" }}
        >
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};

export default PositionedMenu;
