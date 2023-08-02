import {
  BrowserRouter as Router,
  Routes,
   Route,
  } from "react-router-dom";

import Dashboard from './screens/Dashboard';
import Profile from './screens/Profile';
import Course from './screens/Course';

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} className="elevate:[4]"/>
            <Router>
            <Routes>
             <Route path="/" element={<Dashboard/>} />
             <Route path="/Profile" element={<Form/>} />
             {/* <Route path="/Course" element={<Course/>} /> */}
           </Routes>
           </Router>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}



// function App() {
//   const [theme, colorMode] = useMode();
//   const [isSidebar, setIsSidebar] = useState(true);

//   return (
//     <ColorModeContext.Provider value={colorMode}>

//     <ThemeProvider theme={theme}>
//     <CssBaseline />
//     <div className="app">
//       <Sidebar/>
//       <main className="content">
//             <Topbar setIsSidebar={setIsSidebar} />
//       <Router> 
//         <div>
//           <Routes>
//             <Route path="/" element={<Dashboard/>} />
//             <Route path="/Profile" element={<Form/>} />
//             {/* <Route path="/Course" element={<Course/>} /> */}
//           </Routes>
//         </div>
//       </Router>
//       </main>
//     </div>
//     </ThemeProvider>
//     </ColorModeContext.Provider>
//   );
// }

export default App;
