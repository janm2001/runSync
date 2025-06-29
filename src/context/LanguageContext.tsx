import { createContext, useContext, useState, type ReactNode } from "react";

type Language = "en" | "hr";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Dashboard translations
    "dashboard.welcome.coach": "Welcome, Coach!",
    "dashboard.welcome.client": "Welcome back!",
    "dashboard.subtitle.coach": "Manage your athletes and training programs",
    "dashboard.subtitle.client": "Track your progress and upcoming trainings",

    // Stats translations
    "stats.total.athletes": "Total Athletes",
    "stats.group.members": "Group Members",
    "stats.active.groups": "Active Groups",
    "stats.trainings.month": "Trainings This Month",
    "stats.week.sessions": "Weekly Sessions",
    "stats.personal.best": "Personal Best",
    "stats.avg.performance": "Avg Performance",
    "stats.progress.score": "Progress Score",

    // Strava integration translations
    "strava.integration.title": "Strava Integration",
    "strava.integration.description":
      "Connect your Strava account to automatically sync your running activities",
    "strava.connection.status": "Connection Status",
    "strava.connected": "Connected",
    "strava.not.connected": "Not Connected",
    "strava.connecting": "Connecting...",
    "strava.connect": "Connect to Strava",
    "strava.syncing": "Syncing...",
    "strava.sync.activities": "Sync Activities",
    "strava.sync.description":
      "Import your latest running activities from Strava",
  },
  hr: {
    // Dashboard translations
    "dashboard.welcome.coach": "Dobrodošli, trenere!",
    "dashboard.welcome.client": "Dobrodošli natrag!",
    "dashboard.subtitle.coach":
      "Upravljajte svojim sportašima i programima treninga",
    "dashboard.subtitle.client": "Pratite svoj napredak i nadolazeće treninge",

    // Stats translations
    "stats.total.athletes": "Ukupno Sportaša",
    "stats.group.members": "Članovi Grupe",
    "stats.active.groups": "Aktivne Grupe",
    "stats.trainings.month": "Treninzi Ovaj Mjesec",
    "stats.week.sessions": "Tjedne Sesije",
    "stats.personal.best": "Osobni Rekord",
    "stats.avg.performance": "Prosječna Performansa",
    "stats.progress.score": "Rezultat Napretka",

    // Strava integration translations
    "strava.integration.title": "Strava Integracija",
    "strava.integration.description":
      "Povežite svoj Strava račun za automatsko sinkroniziranje aktivnosti trčanja",
    "strava.connection.status": "Status Veze",
    "strava.connected": "Povezano",
    "strava.not.connected": "Nije Povezano",
    "strava.connecting": "Povezivanje...",
    "strava.connect": "Poveži sa Strava",
    "strava.syncing": "Sinkroniziranje...",
    "strava.sync.activities": "Sinkroniziraj Aktivnosti",
    "strava.sync.description":
      "Uvezi svoje najnovije aktivnosti trčanja iz Strava",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    const translation =
      translations[language][
        key as keyof (typeof translations)[typeof language]
      ];
    return translation || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
