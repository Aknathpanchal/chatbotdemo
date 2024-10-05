import React from 'react';
import ChatRoom from '../../ChatRoom';
import { AppBar, Box, Container, Typography } from '@mui/material';

const ChatBot = () => {
  return (
    <div style={{ background: "#003D48", height: "100vh" }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "white", color: "black" }}
      >
        <Container maxWidth="xl">
          <Box
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", lg: "flex" },
            }}
          >
            <img
              src="/assets/mannmuktt logo.png"
              alt="Logo"
              style={{ height: 40, width: "auto" }}
            />
          </Box>
          <Box
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              display: { xs: "flex", lg: "none" },
              flexGrow: 1,
              justifyContent: "center",
            }}
          >
            <img
              src="/assets/mannmuktt logo.png"
              alt="Logo"
              style={{ height: 40, width: "auto" }}
            />
          </Box>
        </Container>
      </AppBar>

      <div
        style={{
          height: "94%",
          width: "100%",
          display: "flex",
        //   justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {/* Box with Image and Text */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            // justifyContent: "center",
            mb: 4, // margin bottom to give space between box and chat room
          }}
        >
          <img
            src="/assets/mann.png"
            alt="Sample"
            style={{ height: "40vh", width: "auto" }}
          />
          <Typography variant="h6" sx={{ mt: 2, color: "white" }}>
            Welcome to the Chat!
          </Typography>
          <Typography variant="body1" sx={{ color: "white" }}>
            We're here to assist you with your queries.
          </Typography>
        </Box>

        {/* ChatRoom Component */}
        <ChatRoom />
      </div>
    </div>
  );
};

export default ChatBot;
