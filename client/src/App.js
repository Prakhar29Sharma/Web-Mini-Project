import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Box, Typography } from '@mui/material';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Navbars from "./screens/global/Navbars";
import Sidebar2 from "./screens/global/Sidebar2";
import Dashboard from './screens/dashboard/Dashboard';
import Profile from './screens/profileform/Profile';
import Course from './screens/table/Course';

function App() {
  // theme setup
  const [theme, colorMode] = useMode();
  //const [isSidebar, setIsSidebar] = useState(true);

  return (


    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <BrowserRouter>

            <Navbars />
            <Box height={50} />
            <Box sx={{ display: 'flex' }}>
              <Sidebar2 />

              
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/Profile" element={<Profile />} />
                  <Route path="/Course" element={<Course />} />
                </Routes>
             
            </Box>

          </BrowserRouter>

        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
