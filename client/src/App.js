import './App.css';
import Nav from './components/nav';
import ShoppingCartPage from './pages/ShoppingCartPage';
import Footer from './components/footer';

function App() {
  return (
    <div className="App">
      <Nav/>
      <ShoppingCartPage />
      <Footer />
    </div>
  );
}

export default App;
