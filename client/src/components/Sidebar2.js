import {useState}from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {BiLogoDiscourse} from 'react-icons/bi';
import { AiOutlineDashboard } from 'react-icons/ai';
import {CgProfile} from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../appStore';

const drawerWidth = 240;

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



export default function Sidebar2() {
  const theme = useTheme();
  //const [open, setOpen] = useState(false);
  const navigate=useNavigate();
  const open = useAppStore((state) => state.dopen);
 
  

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* <Box height={80}/> */}
      <Drawer variant="permanent" open={open}
      sx={ {
        display: { xs: 'none', sm: 'block' },
        '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            
            backgroundImage: 'url("https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cGF0dGVybnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=1000&q=60")',
            position: 'absolute',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            '&:before': {
                position: 'absolute',
                width: '100%',
                height: '100%',
                content: '""',
                display: 'block',
                background: '#ffff',
                opacity: '0.6'
            }
        }
    } }
      >
        <DrawerHeader>
          <IconButton>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />


{/* sx={{ backgroundImage: 'url("https://plus.unsplash.com/premium_photo-1666963323736-5ee1c16ef19d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bmF0dXJlfGVufDB8fDB8fHww&auto=format&fit=crop&w=1000&q=60")'}} */}


        <List>
            <ListItem disablePadding sx={{ display: 'block' }} onClick={()=>(navigate("/Profile"))}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <CgProfile size={30}/>
                </ListItemIcon>
                <ListItemText primary="Profile" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          
            <ListItem disablePadding sx={{ display: 'block' }} onClick={()=>(navigate("/"))} >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <AiOutlineDashboard size={30}/>
                </ListItemIcon>
                <ListItemText primary="Dashboard" sx={{ opacity: open ? 1 : 0 }}  />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding sx={{ display: 'block' }} onClick={()=>(navigate("/Course"))}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <BiLogoDiscourse size={30}/>
                </ListItemIcon>
                <ListItemText primary="Course" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          
                  
        </List>
        <Divider />
        
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                  
      </Box>
    </Box>
  );
}