
import TodoMain from './TodoMain';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './style/App.css'


function App() {
  return (
    <div className="app-wrapper">
      <header>
        <Navbar />
      </header>
      <main style={{ paddingTop: '80px' } }>
        <TodoMain />
      </main>
      <footer>
        <Footer/>
      </footer>
    </div>
  );
}

export default App;
