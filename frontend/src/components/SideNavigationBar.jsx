import React from "react";
import { IconButton, Stack, Typography, Box } from "@mui/material";
import {
  ChatOutlined as ChatIcon,
  NotificationsOutlined as NotificationsIcon,
  GroupsOutlined as GroupsIcon,
  CalendarMonthOutlined as CalendarIcon,
  LocalPhoneOutlined as PhoneIcon,
  PowerSettingsNewRounded as LogoutIcon,
  ChatRounded as ChatActiveIcon,
  NotificationsActiveRounded as NotificationsActiveIcon,
  GroupsRounded as GroupsActiveIcon,
  LocalPhoneRounded as PhoneActiveIcon,
} from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { grey, indigo } from "@mui/material/colors";

const SideNavigationBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navigationLinks = [
    {
      name: "Chat",
      icon: <ChatIcon />,
      activeIcon: <ChatActiveIcon sx={{ color: indigo[600] }} />,
      link: "/chats",
    },
    {
      name: "Activity",
      icon: <NotificationsIcon />,
      activeIcon: <NotificationsActiveIcon sx={{ color: indigo[600] }} />,
      link: "/notifications",
    },
    {
      name: "Groups",
      icon: <GroupsIcon />,
      activeIcon: <GroupsActiveIcon sx={{ color: indigo[600] }} />,
      link: "/groups",
    },
    // {
    //   name: "Calender",
    //   icon: <CalendarIcon />,
    //   link: "/calender",
    // },
    {
      name: "Calls",
      icon: <PhoneIcon />,
      activeIcon: <PhoneActiveIcon sx={{ color: indigo[600] }} />,
      link: "/calls",
    },
  ];

  const isActiveLink = (link) => {
    return location.pathname === link;
  };

  const handleLogout = () => {
    localStorage.removeItem("chatAppUserInfo");
    navigate("/login");
  };

  return (
    <Stack
      alignItems="center"
      justifyContent="space-between"
      sx={{
        py: 2,
        borderRight: `1px solid ${grey[300]}`,
        height: "100%",
        backgroundColor: grey[200],
      }}
    >
      <Stack gap={2}>
        {navigationLinks.map((item) => (
          <Link to={item.link} key={item.name}>
            <IconButton>
              {isActiveLink(item.link) ? item.activeIcon : item.icon}
            </IconButton>
            <Typography
              sx={{ lineHeight: 1, fontWeight: 500, fontSize: 12 }}
              align="center"
            >
              {item.name}
            </Typography>
          </Link>
        ))}
      </Stack>
      <Stack alignItems="center">
        <IconButton onClick={handleLogout}>
          <LogoutIcon />
        </IconButton>
        <Typography
          sx={{ lineHeight: 1, fontWeight: 500, fontSize: 12 }}
          align="center"
        >
          Signoff
        </Typography>
      </Stack>
    </Stack>
  );
};

export default SideNavigationBar;
