import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import CreateAccount from "./pages/CreateAccount";
import Login from "./pages/Login";
import Account from "./pages/Account";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/create-account" element={<CreateAccount />} />
      <Route path="/login" element={<Login />} />
      <Route path="/account" element={<Account />} />
    </Routes>
  );
}

export default App;