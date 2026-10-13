import Header from './Component/Layout/Header';
import Footer from './Component/Layout/Footer';
import './App.css';
import MenuLeft from './Component/Layout/MenuLeft';

function App({ children }) {
  return (
    <div className="container">
      <div className="row">
        <Header />
      <MenuLeft/>
      {children}
      <Footer />
      </div>
      
    </div>
  );
}

export default App;
