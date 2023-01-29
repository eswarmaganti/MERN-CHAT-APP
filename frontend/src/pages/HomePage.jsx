import React, { useState } from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import HomeNavbar from "../components/HomeNavbar";

const HomePage = () => {
  const [tab, setTab] = useState(0);

  const handleTabChange = (e, tab) => {
    setTab(tab);
  };
  return (
    <Box>
      {/* <Typography
        sx={styles.heading}
        color="primary"
        variant="h4"
        component="h5"
        align="center"
        gutterBottom
      >
        Talk Chat
      </Typography>

      <Box sx={styles.tabsContainer}>
        <Tabs onChange={handleTabChange} value={tab}>
          <Tab
            label="Log in"
            sx={styles.tab}
            id="tab-0"
            aria-controls={`tab-panel-0`}
          />
          <Tab
            label="Sign up"
            sx={styles.tab}
            id="tab-1"
            aria-controls={`tab-panel-1`}
          />
        </Tabs>
        <TabPanel value={tab} index={0}>
          <LoginForm />
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <SignupForm />
        </TabPanel>
      </Box> */}
      <HomeNavbar />
      <Typography>Talk Chat</Typography>
    </Box>
  );
};

const TabPanel = ({ value, index, children }) => {
  return (
    <div
      hidden={value !== index}
      role="tabpanel"
      id={`tab-panel-${index}`}
      aria-labelledby={`tab-${index}`}
    >
      {children}
    </div>
  );
};

const styles = {
  homepage: {
    minHeight: "100vh",
    // width: "100vw",
    background:
      'linear-gradient(45deg, rgba(0,0,0,.9) 0%, rgba(0,0,0,0.7) 90%), url("src/assets/images/background.jpg")',
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    // padding: "2rem 4rem",
  },
  heading: {
    fontWeight: "bold",
    marginBottom: "1rem",
  },
  tabsContainer: {
    width: "40%",
    margin: "auto",
  },
  tab: {
    color: "#ABABAD",
  },
};

export default HomePage;
