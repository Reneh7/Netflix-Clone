import "./App.css";
import Home from "./Components/Home";
import { Routes, Route } from "react-router-dom";
import  Navbar  from "./Components/Navbar";
import { Container } from "react-bootstrap";
import FavList from "./Components/FavList"
function App() {
  return (
    <div className="bg-light">
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/FavList" element={<FavList />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
