import "./App.css";
import Home from "./Components/Home";
import { Routes, Route } from "react-router-dom";
import  Navbar  from "./Components/Navbar";
import { Container } from "react-bootstrap";
function App() {
  return (
    <div className="bg-light">
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
