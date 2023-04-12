import './App.css';
import Home from './Pages/Home/Home';
import SideBar from './components/SideBar/SideBar';
import TopBar from './components/TopBar';

function App() {
  return (
    <div className="App">
      <TopBar disabled={true}/>
      <Home />
      <SideBar />
    </div>
  );
}

export default App;
