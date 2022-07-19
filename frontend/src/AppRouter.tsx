import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";

import { App } from "./pages/App";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import { Header } from "./pages/Header";

function AppRouter() {
  return (
    <BrowserRouter>
      <div>
        {" "}
        <Header />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default AppRouter;
