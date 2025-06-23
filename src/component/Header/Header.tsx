import React, { useState } from "react";
import { AppBar, Toolbar,  Button, IconButton, Drawer, List, ListItem, ListItemText, Box, Container, useMediaQuery, ListItemButton } from "@mui/material";
import { styled } from "@mui/system";
import { FiMenu } from "react-icons/fi";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: "#ffffff",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
}));

const LogoContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  "& img": {
    width: "120px",
    height: "40px",
    objectFit: "contain"
  }
});

const NavContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  flex: 1,
  justifyContent: "center",
  gap: "2rem"
});

const NavButton = styled(Button)({
  color: "#333333",
  textTransform: "none",
  fontSize: "1rem",
  "&:hover": {
    backgroundColor: "rgba(0,0,0,0.04)"
  }
});

const LoginButton = styled(Button)({
  backgroundColor: "#1976d2",
  color: "#ffffff",
  textTransform: "none",
  padding: "8px 24px",
  "&:hover": {
    backgroundColor: "#1565c0"
  }
});

const Header = () => {
  
  const navigate = useNavigate();  
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));


    const menuItems = [{page: "Home", url: ""},{page:"Patient Search",url: "PatientSearch" },{page: "Add Resources",url:"AddResources"},{page: "About",url:"About"}]

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

const drawer = (
  <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
    <List>
      {menuItems.map((item) => (
        <ListItem key={item.page} disablePadding>
          <ListItemButton>
            <ListItemText primary={item.page} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  </Box>
);

  return (
    <React.Fragment>
      <StyledAppBar position="sticky">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <LogoContainer>
              <img
                src="https://images.unsplash.com/photo-1614680376573-df3480f0c6ff"
                alt="Company Logo"
                loading="lazy"
              />
            </LogoContainer>

            {isMobile ? (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ ml: "auto", color: "#333333" }}
              >
                <FiMenu />
              </IconButton>
            ) : (
              <>
                <NavContainer>
                  {menuItems.map((item) => (
                    <NavButton
                      key={item.page}
                      aria-label={`navigate to ${item.url.toLowerCase()}`}
                      onClick={()=>navigate(`/${item.url.toLowerCase()}`)}
                    >
                      {item.page}
                    </NavButton>
                  ))}
                </NavContainer>
                <LoginButton variant="contained" aria-label="login">
                  Login
                </LoginButton>
              </>
            )}
          </Toolbar>
        </Container>
      </StyledAppBar>

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true
        }}
      >
        {drawer}
      </Drawer>
    </React.Fragment>
  );
};

export default Header;