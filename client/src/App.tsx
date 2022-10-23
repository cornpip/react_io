import "./App.css";
import Blog from "./page/Blog";
import Ai from "./page/Ai";
import Upload from "./page/Upload"
import Test from "./page/Test";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const root_path = "/react_io"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={root_path} element={<Blog />} />
        <Route path={root_path + "/ai"} element={<Ai />} />
        <Route path="/upload" element={<Upload />}/>
        <Route path="/test" element={<Test />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
