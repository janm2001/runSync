import Navbar from "./components/Navbar/Navbar";
import Coach from "./pages/Coach/Coach";
import Client from "./pages/Client/Client";
import { LanguageProvider } from "./context/LanguageContext";
import { UserPrvoider, useUser } from "./context/UserContext";
import Login from "./pages/Login/Login";
import { useState } from "react";

const AppContent = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");
  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage("main");
  };

  const { user } = useUser();
  const renderPage = () => {
    if (currentPage === "login") {
      return <Login handleLogin={handleLogin} />;
    } else if (isLoggedIn && currentPage === "main" && user === "client") {
      return (
        <>
          <Navbar /> <Client />
        </>
      );
    } else if (isLoggedIn && currentPage === "main" && user === "coach") {
      return (
        <>
          <Navbar /> <Coach />
        </>
      );
    }
  };
  return renderPage();
};

function App() {
  return (
    <UserPrvoider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </UserPrvoider>
  );
}

export default App;
