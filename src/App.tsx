import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import GlobalStyles from './GlobalStyles';
import { ThemeProvider } from './context/ThemeContext';
import Home from './pages/Home';
import CuisinePage from './pages/CuisinePage';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

const Layout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Header />
    <Toolbar />
    {children}
    <Footer />
  </>
);

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <GlobalStyles />
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/:cuisine" element={<Layout><CuisinePage /></Layout>} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
