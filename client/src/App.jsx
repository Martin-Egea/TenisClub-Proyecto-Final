import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1 className="text-3xl">Home</h1>} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/register"
          element={
            <h1>
              <RegisterPage />
            </h1>
          }
        />
        <Route path="/cuotasSociales" element={<h1>Home</h1>} />
        <Route path="/profile" element={<h1>profile</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
