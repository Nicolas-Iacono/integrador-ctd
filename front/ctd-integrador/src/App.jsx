import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./components/Pages/Home";
import Instrument from "./components/Pages/Instrument";
import "./App.css";
import Layout from "./components/Layout/Layout";

function App() {
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/instrument" element={<Instrument />} />
      </Route>
    </Routes>
  </BrowserRouter>;
}

export default App;
