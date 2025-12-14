import { SignInButton, SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";
import { Routes, Route, Navigate } from "react-router";
import HomePage from "./pages/HomePage";
import ProblemPage from "./pages/ProblemPage";

function App() {
  const { isSignedIn } = useUser();

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/problems" element={isSignedIn ? <ProblemPage /> : <Navigate to={"/"} />} />
    </Routes>
  );
}

export default App;
