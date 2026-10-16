import Header from './Component/Layout/Header';
import Footer from './Component/Layout/Footer';
import './App.css';
import MenuLeft from './Component/Layout/MenuLeft';

function App({ children }) {
  return (
    <>
      <Header />
      <main className="container">
        <div className="row">
          <MenuLeft />
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
