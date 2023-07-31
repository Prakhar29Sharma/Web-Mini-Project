import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Topbar from "../global/Topbar";

const Dashboard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  
    return (
        <>
        <Topbar />
        </>
        );
    };
    
    export default Dashboard;