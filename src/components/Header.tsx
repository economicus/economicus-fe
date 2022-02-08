import * as React from "react";
// style
import {
  StyledSearch,
  SearchIconWrapper,
  StyledInputBase,
  StyledAppBar,
} from "./Header.styled";
// mui
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import MoreIcon from "@mui/icons-material/MoreVert";
// links
import { Link } from "react-router-dom";

export default function Header() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClick = (pageURL: string) => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClick = (pageURL: string) => {
    setAnchorEl(null);
    handleMobileMenuClick(pageURL);
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={() => setAnchorEl(null)}
    >
      <MenuItem onClick={() => handleMenuClick("/")}>프로파일</MenuItem>
      <MenuItem onClick={() => handleMenuClick("/")}>실험실</MenuItem>
      <MenuItem onClick={() => handleMenuClick("/")}>설정</MenuItem>
      <MenuItem onClick={() => {}}>로그아웃</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={() => setMobileMoreAnchorEl(null)}
    >
      <MenuItem>
        <IconButton size="large" aria-label="home" color="inherit">
          <HomeOutlinedIcon />
        </IconButton>
        <p>Home</p>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" aria-label="show new chats" color="inherit">
          <Badge badgeContent={4} color="error">
            <ChatBubbleOutlineIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsOutlinedIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircleOutlinedIcon />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <StyledAppBar position="static">
        <Toolbar>
          <Link to={"/"}>
            <Box
              component="img"
              alt="logo"
              src="https://icon-library.com/images/github-social-media-icon/github-social-media-icon-1.jpg"
              sx={{ height: 50, width: 50, marginRight: 2 }}
            />
          </Link>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            이코노미쿠스
          </Typography>
          <StyledSearch sx={{ display: { xs: "block", sm: "none" } }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </StyledSearch>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <StyledSearch>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </StyledSearch>
            <Link to={"/"}>
              <IconButton size="large" color="inherit" aria-label="home">
                <HomeOutlinedIcon />
              </IconButton>
            </Link>
            {/* dm page */}
            <Link to={"/search"}>
              <IconButton
                size="large"
                aria-label="show new chats"
                color="inherit"
              >
                <Badge badgeContent={4} color="error">
                  <ChatBubbleOutlineIcon />
                </Badge>
              </IconButton>
            </Link>
            {/* pop up notifications on click */}
            <IconButton
              size="large"
              aria-label="show new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsOutlinedIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircleOutlinedIcon />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </StyledAppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
