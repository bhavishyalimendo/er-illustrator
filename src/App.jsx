import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { AppRoutes } from "./routes";
import AppHeader from "./components/Header";

// For debugging
console.log("App component loaded");

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <AppHeader />
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;
