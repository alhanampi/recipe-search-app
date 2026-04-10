import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import GlobalStyles from './GlobalStyles';
import { ThemeProvider } from './context/ThemeContext';
import Home from './pages/Home';
import CuisinePage from './pages/CuisinePage';
import SearchPage from './pages/SearchPage';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import RecipePage from './pages/RecipePage';

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
          <Route path="/search/:query" element={<Layout><SearchPage /></Layout>} />
          <Route path="/recipe/:id" element={<Layout><RecipePage /></Layout>} />
          <Route path="/:cuisine" element={<Layout><CuisinePage /></Layout>} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
