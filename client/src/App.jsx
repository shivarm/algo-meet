import { useUser } from "@clerk/clerk-react";
import { Routes, Route, Navigate } from "react-router";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import ProblemPage from "./pages/ProblemPage";
import ProblemDetail from "./pages/ProblemDetail";

function App() {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) return null;

  return (
    <Routes>
      <Route path="/" element={!isSignedIn ? <HomePage /> : <Navigate to={"/dashboard"} />} />
      <Route path="/dashboard" element={isSignedIn ? <DashboardPage /> : <Navigate to={"/"} />} />
      <Route path="/problems" element={isSignedIn ? <ProblemPage /> : <Navigate to={"/"} />} />
      <Route path="/problem/:id" element={isSignedIn ? <ProblemDetail /> : <Navigate to={"/"} />} />
    </Routes>
  );
}

export default App;
