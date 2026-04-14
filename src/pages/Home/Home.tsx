import SearchBar from '../../components/SearchBar/SearchBar';
import Category from '../../components/Category/Category';
import TopPicks from '../../components/TopPicks/TopPicks';
import VeggiePicks from '../../components/VeggiePicks/VeggiePicks';

const Home = () => {
  return (
    <div>
      <SearchBar hideOnMobile />
      <Category />
      <TopPicks />
      <VeggiePicks />
    </div>
  );
};

export default Home;
