import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./components/home";

function App() {
  return (
    <div className="App d-flex flex-column bg-red ">
      <header className="App-header">
        <Navbar />
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="" element=""></Route>
          <Route path="" element=""></Route>
          <Route path="" element=""></Route>
          <Route path="" element=""></Route>
        </Routes>
      </main>

      <footer>
        <Footer/>
      </footer>
    </div>
  );
}

export default App;
