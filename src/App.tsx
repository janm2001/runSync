import Navbar from "./components/Navbar/Navbar";
import Coach from "./pages/Coach/Coach";
import Client from "./pages/Client/Client";
import { LanguageProvider } from "./context/LanguageContext";
import { UserPrvoider, useUser } from "./context/UserContext";

function App() {
  const { user } = useUser();
  console.log("Current user:", user);
  return (
    <UserPrvoider>
      <LanguageProvider>
        <Navbar />
        {user === "client" ? <Client /> : <Coach />}
      </LanguageProvider>
    </UserPrvoider>
  );
}

export default App;
