import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

function App({ children }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default App;
