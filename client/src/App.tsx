import "./App.css";
import Blog from "./page/Blog";
import Ai from "@/page/Ai";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const root_path = "/react_io"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={root_path} element={<Blog />} />
        <Route path={root_path + "/ai"} element={<Ai />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
