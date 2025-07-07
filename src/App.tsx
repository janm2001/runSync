import Navbar from "./components/Navbar/Navbar";
import Coach from "./pages/Coach/Coach";
import Client from "./pages/Client/Client";
import { LanguageProvider } from "./context/LanguageContext";
import { UserPrvoider, useUser } from "./context/UserContext";

const AppContent = () => {
  const { user } = useUser();
  return (
    <>
      <Navbar />
      {user === "client" ? <Client /> : <Coach />}
    </>
  );
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
