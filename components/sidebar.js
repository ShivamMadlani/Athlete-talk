import React, { useState, useContext, Fragment, useEffect } from 'react';
import GlobalStyles from '@mui/joy/GlobalStyles';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import LinearProgress from '@mui/joy/LinearProgress';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton, { listItemButtonClasses } from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import SupportRoundedIcon from '@mui/icons-material/SupportRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import BrightnessAutoRoundedIcon from '@mui/icons-material/BrightnessAutoRounded';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import YoutubeIcon from '@mui/icons-material/YouTube'
import ColorSchemeToggle from './ColorSchemeToggle';
import { closeSidebar } from '../pages/dashboard/utils';
import { useRouter } from 'next/router';
import AuthContext from '../authCtx';
import Image from "next/image";
import logo from "../assets/logo.jpg"

function Toggler({
  defaultExpanded = false,
  renderToggle,
  children,
}) {
  const [open, setOpen] = useState(defaultExpanded);
  return (
    <Fragment>
      {renderToggle({ open, setOpen })}
      <Box
        sx={{
          display: 'grid',
          gridTemplateRows: open ? '1fr' : '0fr',
          transition: '0.2s ease',
          '& > *': {
            overflow: 'hidden',
          },
        }}
      >
        {children}
      </Box>
    </Fragment>
  );
}

export default function Sidebar() {

  const [profile, setProfile] = useState({});

  const fetchUser = async () => {
    const response = await fetch(`/api/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  
    if (response.ok) {
      const data = await response.json();
      setProfile(data.user);
    } else {
      alert('Something went wrong', response);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const router = useRouter();
  const authCtx = useContext(AuthContext);

  const user = Object.keys(authCtx.user).length > 0 ? authCtx.user : null;

  let role = 'User';
  if (user && user.role === 'admin') {
    role = 'Admin';
  } else if (user && user.role === 'coach') {
    role = 'Coach';
  }

  const handleSignout = (e) => {
    e.preventDefault();
    authCtx.logout();
    router.push('/login');
  }
  return (
    <Sheet
      className="Sidebar"
      sx={{
        position: {
          xs: 'fixed',
          md: 'sticky',
        },
        transform: {
          xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
          md: 'none',
        },
        transition: 'transform 0.4s, width 0.4s',
        zIndex: 10000,
        height: '100dvh',
        width: 'var(--Sidebar-width)',
        top: 0,
        p: 2,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRight: '1px solid',
        borderColor: 'divider',
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ':root': {
            '--Sidebar-width': '220px',
            [theme.breakpoints.up('lg')]: {
              '--Sidebar-width': '240px',
            },
          },
        })}
      />
      <Box
        className="Sidebar-overlay"
        sx={{
          position: 'fixed',
          zIndex: 9998,
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          opacity: 'var(--SideNavigation-slideIn)',
          backgroundColor: 'var(--joy-palette-background-backdrop)',
          transition: 'opacity 0.4s',
          transform: {
            xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))',
            lg: 'translateX(-100%)',
          },
        }}
        onClick={() => closeSidebar()}
      />
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        {/* <IconButton variant="soft" color="primary" size="sm">
          <BrightnessAutoRoundedIcon />
        </IconButton> */}
        <Image src={logo} width={45} styles="border-radius: 50%" alt="logo" />
        <Typography level="title-lg">Athlete-Talk</Typography>
        <ColorSchemeToggle sx={{ ml: 'auto' }} />
      </Box>
      <Box
        sx={{
          minHeight: 0,
          overflow: 'hidden auto',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5,
          },
        }}
      >
        <List
          size="sm"
          sx={{
            gap: 1,
            '--List-nestedInsetStart': '30px',
            '--ListItem-radius': (theme) => theme.vars.radius.sm,
          }}
        >
          <ListItem component="a" href="/dashboard">
            <ListItemButton selected={router.pathname === '/dashboard'}>
              <DashboardRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm">Dashboard</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem nested>
            <Toggler
              renderToggle={({ open, setOpen }) => (
                <ListItemButton onClick={() => setOpen(!open)}>
                  <AssignmentRoundedIcon />
                  <ListItemContent>
                    <Typography level="title-sm">Plans</Typography>
                  </ListItemContent>
                  <KeyboardArrowDownIcon
                    sx={{ transform: open ? 'rotate(180deg)' : 'none' }}
                  />
                </ListItemButton>
              )}
            >
              <List sx={{ gap: 0.5 }}>
                <ListItem sx={{ mt: 0.5 }} component="a" href="/plans/browse">
                  <ListItemButton selected={router.pathname === '/plans/browse'}>Browse plans</ListItemButton>
                </ListItem>
                <ListItem component="a" href="/plans/myplan">
                  <ListItemButton selected={router.pathname === '/plans/myplan'}>My plans</ListItemButton>
                </ListItem>
                {user && user.role !== 'user' && (
                  <ListItem component="a" href="/plans/create">
                    <ListItemButton selected={router.pathname === '/plans/create'}>Create plan</ListItemButton>
                  </ListItem>
                )}
              </List>
            </Toggler>
          </ListItem>

          <ListItem component="a" href="/videos/browse">
            <ListItemButton selected={router.pathname === "/videos/browse"}>
              <YoutubeIcon />
              <ListItemContent>
                <Typography level="title-sm">Browse videos</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          {user && user.role !== 'user' && (
            <ListItem component="a" href="/videos/upload">
              <ListItemButton selected={router.pathname === "/videos/upload"}>
                <YoutubeIcon />
                <ListItemContent>
                  <Typography level="title-sm">Upload video</Typography>
                </ListItemContent>
              </ListItemButton>
            </ListItem>
          )}

          <ListItem>
            <ListItemButton
              role="menuitem"
              component="a"
              href="/joy-ui/getting-started/templates/messages/"
            >
              <QuestionAnswerRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm">Community chat</Typography>
              </ListItemContent>
              <Chip size="sm" color="primary" variant="solid">
                4
              </Chip>
            </ListItemButton>
          </ListItem>
        </List>

        <List
          size="sm"
          sx={{
            mt: 'auto',
            flexGrow: 0,
            '--ListItem-radius': (theme) => theme.vars.radius.sm,
            '--List-gap': '8px',
            mb: 2,
          }}
        >
          <ListItem component="a" href='/profile'>
            <ListItemButton selected={router.pathname === '/profile'}>
              <SettingsRoundedIcon />
              Settings
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
      <Divider />
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <Avatar
          variant="outlined"
          size="sm"
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
        />
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography level="title-sm">{profile.name}</Typography>
          <Typography level="body-xs">{profile.email}</Typography>
        </Box>
        <IconButton size="sm" variant="plain" color="neutral">
          <LogoutRoundedIcon onClick={handleSignout} />
        </IconButton>
      </Box>
    </Sheet>
  );
}