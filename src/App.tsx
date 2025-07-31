import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Coach from "./pages/Coach/Coach";
import Client from "./pages/Client/Client";
import Settings from "./pages/Settings/Settings";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/Login/Login";
import { LanguageProvider } from "./context/LanguageContext";
import { UserProvider, useUser } from "./context/UserContext";

const NavbarLayout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
};

const MainPage = () => {
  const { user } = useUser();
  if (user?.role === 0) {
    return <Client />;
  }
  if (user?.role === 1) {
    return <Coach />;
  }
  return <div>Loading user information...</div>;
};

const ProtectedRoute = () => {
  const { user } = useUser();

  // Check if the user is either a 'client' or a 'coach'
  if (user?.role !== 1 && user?.role !== 0) {
    // If not, redirect them to the /login page
    return <Navigate to="/login" replace />;
  }

  // If they are a valid user, render the child route component
  return <Outlet />;
};

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <LanguageProvider>
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route element={<ProtectedRoute />}>
              <Route element={<NavbarLayout />}>
                <Route path="/" element={<MainPage />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
              </Route>
            </Route>

            <Route path="*" element={<h1>404: Page Not Found</h1>} />
          </Routes>
        </LanguageProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
