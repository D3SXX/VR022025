
import SideBar from './components/SideBar'
import GetData from './components/GetData'
import { Box } from '@mui/material'
import { BrowserRouter, Route, Routes } from 'react-router';
import ChartElement from './components/ChartElement';
import NotFound from './components/NotFound';
import DefaultPage from './components/DefaultPage';
import NavBar from './components/NavBar';
const drawerWidth = "250px";

function App() {
  return (
    <BrowserRouter>
    <div className="bg-gray-100">
      <GetData />
      <div className='hidden md:flex'><SideBar /></div>
      <div className='md:hidden'><NavBar /></div>
      <Box
        className="h-screen flex flex-grow"
        sx={{
          marginLeft: {xs: '0px', md: drawerWidth},
        }}
      >
        <div className="md:m-4 flex-1">

        <Routes>
          <Route path="/" element={<DefaultPage />} />
          <Route path="/:chartId" element={<ChartElement />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </div>
      </Box>
      </div>
    </BrowserRouter>
  );
}


export default App
