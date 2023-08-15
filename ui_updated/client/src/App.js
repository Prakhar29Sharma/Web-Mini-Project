import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Navbars from "./screens/global/Navbars";
import Sidebar2 from "./screens/global/Sidebar2";
import Dashboard from "./screens/dashboard/Dashboard";
import Profile from "./screens/profileform/Profile";
import Course from "./screens/table/Course";
import LandingPage from "./screens/landingpage/Landingpage";
import Landingpage from "./screens/landingpage/Landingpage";
import L_navbar from "./screens/landingpage/L_navbar";
import Index from "./screens/landingpage/Index";

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
            {/* Conditionally render Navbar and Sidebar based on the route */}

            <LandingPage></LandingPage>
            <L_navbar></L_navbar>

            <Routes>
              {/* Landing Page Route */}
              <Route path="/landing" element={<Index />} />

              {/* Other Routes */}
              <Route path="/*" element={<AuthenticatedRoutes />} />
            </Routes>
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

function AuthenticatedRoutes() {
  return (
    <>
      <Navbars />
      <Box height={50} />
      <Box sx={{ display: "flex" }}>
        <Sidebar2 />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Course" element={<Course />} />
        </Routes>
      </Box>
    </>
  );
}

export default App;
