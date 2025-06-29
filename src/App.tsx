import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Coach from "./pages/Coach/Coach";
import type { ViewTab } from "./components/Navbar/types";
import Client from "./pages/Client/Client";
import { LanguageProvider } from "./context/LanguageContext";

function App() {
  const [activeTab, setActiveTab] = useState<ViewTab>("client");
  return (
    <LanguageProvider>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "client" ? <Client /> : <Coach />}
    </LanguageProvider>
  );
}

export default App;
