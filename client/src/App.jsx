import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { ReservaProvider } from "./context/ReservaContext";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <UserProvider>
      <ReservaProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<HomePage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ReservaProvider>
    </UserProvider>
  );
}

export default App;
