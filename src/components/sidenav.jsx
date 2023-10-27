import { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';

import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../pages/auth/firebase/firebase";

import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { ColorModeContext, tokens } from '../theme';

import * as BsIcons from 'react-icons/bs'
import * as FiIcons from 'react-icons/fi'

import logo from '../assets/directtable.png'

import './navbar.css'

import Home from '../pages/home';
import Horario from '../pages/horario';
import Escola from '../pages/escola';
import ERC from '../pages/erc';
import FAQ from '../pages/faq';
import Suporte from '../pages/suporte';
import LandingPage from '../pages/auth/landingPage';

import { SidebarData } from './sidebar';
import { Link } from 'react-router-dom';



const drawerWidth = 160;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function Sidenav() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const ColorMode = useContext(ColorModeContext);

  const [open, setOpen] = useState(false);
  const [menuData, setMenuData] = useState("");



  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      listen();
    };
  }, []);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        // console.log("Saiu com sucesso!");
        setAuthUser(null);
        window.location.reload();
      })
      .catch((error) => console.log(error));
  };

  const url = useLocation();

  // const getUrl = () => {
  //   if (url.pathname == '/directtable-app/') {
  //     setMenuData('/directtable-app/');
  //   }
  //   else if (url.pathname == '/directtable-app/horario') {
  //     setMenuData('/directtable-app/horario');
  //   }
  //   else if (url.pathname == '/escola') {
  //     setMenuData('/directtable-app/escola');
  //   }
  //   else if (url.pathname == '/gestao') {
  //     setMenuData('/directtable-app/gestao');
  //   }
  //   else if (url.pathname == '/faq') {
  //     setMenuData('/directtable-app/faq');
  //   }
  //   else if (url.pathname == '/suporte') {
  //     setMenuData('/directtable-app/suporte');
  //   }
  //   else if (url.pathname == '/entrar') {
  //     setMenuData('/directtable-app/entrar');
  //   }
  // }

  // useEffect(() => {
  //   getUrl();
  // }, [url.pathname])

  useEffect(() => {
    setMenuData(localStorage.getItem('lastPage'))
  })

  useEffect(() => {
    if (localStorage.getItem('lastPage') == null || localStorage.getItem('lastPage') == 0) {
      localStorage.setItem('lastPage', 0)
    }
    if (window.innerWidth >= 850) {
      setOpen(true);
    }
  }, [window.innerWidth])

  return (
    <>
      <Box sx={{
        backgroundColor: colors.fundo[500],
        display: 'flex',
        '.css-15b8vjn-MuiPaper-root-MuiDrawer-paper': {
          borderColor: 'RGB(224, 224, 224, 0.12)',

        }
      }}>
        <CssBaseline />
        <AppBar position="fixed" elevation={4} sx={{
          backgroundColor: colors.nav[500],
          color: colors.icons[500],
        }}>
          <Toolbar sx={{
            backgroundColor: colors.nav[500],
            color: colors.icons[500],

          }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => { setOpen(!open) }}
              edge="start"
              sx={{
                ':hover': {
                  color: colors.projectColor[400],
                },
              }}
            >
              {open ? <BsIcons.BsArrowBarLeft /> : <BsIcons.BsList />}
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              <img src={logo} alt='Logo' height={60} className='Logo' />
            </Typography>
            <Box sx={{ flexGrow: 2 }} />
            <Typography>
              <Link className='tema'>
                <IconButton edge="end" onClick={ColorMode.toggleColorMode} sx={{
                  ':hover': {
                    color: colors.projectColor[400],
                    backgroundColor: colors.nav[500],
                  },
                  borderRadius: 0,
                  backgroundColor: colors.nav[500],
                  "& .MuiTouchRipple-root .MuiTouchRipple-child": {
                    borderRadius: "0px",
                  }
                }}>
                  {theme.palette.mode === 'dark' ? <BsIcons.BsMoon className='navbar-DarkMode' /> : <BsIcons.BsSun className='navbar-LightMode' />}
                </IconButton>
              </Link>
              {authUser ?
                <Link className='LogIcon' onClick={userSignOut}>
                  <IconButton edge="end" sx={{
                    ':hover': {
                      color: colors.projectColor[400],
                      backgroundColor: colors.nav[500],
                    },
                    borderRadius: 0,
                    backgroundColor: colors.nav[500],
                    "& .MuiTouchRipple-root .MuiTouchRipple-child": {
                      borderRadius: "0px",
                    }
                  }}>
                    <FiIcons.FiLogOut className='LogOut' />
                    <p className='log-text navbar-logout'>Sair</p>
                  </IconButton>
                </Link>
                :
                <Link to='/entrar' className='LogIcon'>
                  <IconButton edge="end" sx={{
                    ':hover': {
                      color: colors.projectColor[400],
                      backgroundColor: colors.nav[500],
                    },
                    borderRadius: 0,
                    backgroundColor: colors.nav[500],
                    "& .MuiTouchRipple-root .MuiTouchRipple-child": {
                      borderRadius: "0px",
                    }
                  }}>
                    <FiIcons.FiLogIn className='LogIn' />
                    <p className='log-text navbar-login'>Entrar</p>
                  </IconButton>
                </Link>
              }

            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
          </DrawerHeader>
          <List>
            {SidebarData.map((item, index) => (
              <Link key={index}>
                <ListItem disablePadding key={index} sx={{
                  display: 'block',
                }} onClick={() => {
                  setMenuData(index)
                  localStorage.setItem('lastPage', index)
                }}>
                  <Box
                    className={item.className} sx={{ color: colors.texto[500] }}>
                    <ListItemButton
                      className={item.className}
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        className={item.className + ' icon'}
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : 'auto',
                          justifyContent: 'center',
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText primary={item.title} sx={{ opacity: open ? 1 : 0, }} />
                    </ListItemButton>
                  </Box>
                  {item.title == 'Gestão' ? <Divider sx={theme.palette.mode === 'dark' ? { borderColor: 'RGB(224, 224, 224, 0.12)' } : { borderColor: 'RGB(224, 224, 224)' }} /> : ''}
                </ListItem>
              </Link>
            ))}
          </List>
          <Divider sx={theme.palette.mode === 'dark' ? { borderColor: 'RGB(224, 224, 224, 0.12)' } : { borderColor: 'RGB(224, 224, 224)' }} />
        </Drawer>

        <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: colors.fundo[500], height: '200%' }}>
          {menuData == 0 && <Home />}
          {menuData == 1 && <Horario />}
          {menuData == 2 && <Escola />}
          {menuData == 3 && <ERC />}
          {menuData == 4 && <FAQ />}
          {menuData == 5 && <Suporte />}
          {menuData == 6 && <LandingPage />}
        </Box>
      </Box>
    </>
  );
}