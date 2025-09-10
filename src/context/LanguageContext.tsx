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

    //Analytics
    "analytics.title": "Workout Analytics",
    "analytics.group.title": "Group Progress Monthly",

    //Attendance
    "analytics.attendance.title": "Attendance by month (each group)",

    //Create training
    "create.training.title": "Create New Training Session",
    "create.training.description":
      "Design training sessions that will automatically sync to athletes' watches",

    //Create training form
    "create.training.form.title": "Session Title",
    "create.training.form.group": "Group",
    "create.training.form.type": "Training Type",
    "create.training.form.submit": "Create Training Session",
    "create.training.success": "Training session created successfully!",
    "create.training.error":
      "Failed to create training session. Please try again.",

    //DownloadTimes
    "download.benchmark": "Runners Performance Benchmark",
    "download.benchmark.description":
      "Download a data set of running times to see how you stack up. You can simulate different network speeds.",
    "download.select.speed": "Select Speed:",
    "download.download.data": "Download Data",
    "download.downloading": "Downloading...",
    "download.download.failed":
      "Download failed. Make sure the .NET API is running.",
    "download.benchmark.times": "Benchmark Times",
    "download.time": "Time",
    "download.athlete": "Athlete",
    "download.distance": "Distance",
    "download.skill.level": "Skill Level",
    "download.benchmark.time": "Benchmark Time",

    //GroupCard
    "group.card.members": "Members",
    "group.card.avg.pace": "Avg Pace",

    //GroupOverview
    "group.overview.title": "Group Overview",
    "group.overview.description": "Monitor your training groups at a glance",
    "group.overview.no.data": "No Data Found",

    //ManageClients
    "manage.clients.title": "Client Management",
    "manage.clients.description":
      "Track and grade individual athlete performance",
    "manage.clients.no.data": "No Clients Found",
    "manage.client.no.data.description":
      "There are no clients matching your criteria.",
    "manage.clients.add": "Add New Client",

    //MyGroup
    "mygroup.title": "Group Performance",
    "mygroup.description": "How you compare with your training group",
    // Performance Cards
    "mygroup.avg.pace": "Your average pace",
    "mygroup.consistency.score": "Consistency Score",

    //MyTrainingGroup
    "mytraininggroup.title": "My Training Group",
    "mytraininggroup.description": "Monitor your training groups at a glance",

    //Navbar
    "navbar.settings": "Settings",
    "navbar.logout": "Logout",
    "navbar.profile": "Profile",

    //PersonalRecords
    "personal.records.title": "Personal Records",
    "personal.records.add": "Add New Record",
    "personal.record.crud.title": "Manage Personal Record",
    "personal.record.crud.add": "Add Record",
    "personal.record.crud.title.label": "Title",
    "personal.record.crud.time.label": "Time (MM:SS)",
    "personal.record.crud.date.label": "Date",
    "personal.record.crud.improvement.label": "Improvement",
    "personal.record.crud.cancel": "Cancel",
    "personal.record.crud.save": "Save Changes",

    //Strava Sync
    "strava.sync.title": "Strava Sync",
    "strava.sync.desc":
      "Automatically sync your running activities with Strava",
    "strava.connect.description": "Connect to Strava",
    "strava.connected.as": "Connected as",
    "strava.recent.activities": "Recent Activities",
    "strava.loading": "Loading...",
    "strava.no.activities": "No recent activities found.",
    "strava.error": "Error",
    "strava.disconnect.button": "Disconnect",

    //Training History
    "training.history.title": "Training History",
    "training.history.description":
      "Your performance and coach feedback from recent sessions",

    //TrainingSession
    "training.session.title": "Training Session Details",
    "training.session.dialog.title": "Title",
    "training.session.dialog.type": "Type",
    "training.session.dialog.group": "Group",
    "training.session.dialog.date": "Date",
    "training.session.dialog.duration": "Duration",
    "training.session.dialog.intervals": "Intervals",
    "training.session.dialog.rest": "Rest",
    "training.session.dialog.attendance": "Attendance",
    "training.session.dialog.completed": "Completed",

    //UpcomingTrainingSessions
    "upcoming.training.title": "Training Sessions Report",
    "upcoming.training.export.excel": "Export to Excel",
    "upcoming.training.export.pdf": "Export to PDF",
    "upcoming.training.print": "Print",

    //Coach
    "coach.overview": "Overview",
    "coach.analytics": "Analytics",
    "coach.manage.clients": "Manage Clients",
    "coach.create.training": "Create Training",
    "coach.attendance": "Attendance",
    "coach.view": "Coach",

    //Client
    "client.view": "Client",
    "client.overview": "Overview",
    "client.training.history": "Training History",
    "client.my.group": "My Group",
    "client.progress": "Progress",
    "client.strava.sync": "Strava Sync",

    //Profile
    "profile.title": "Profile page",
    "profile.type.of.user": "Type of user",
    "profile.email": "Email",
    "profile.firstname": "First Name",
    "profile.lastname": "Last Name",
    "profile.goToMainPage": "Go to main page",

    //Settings
    "settings.title": "Settings",
    //MonthlyProgress
    "monthly.progress.title": "Monthly Progress",
    "monthly.progress.trainings": "Trainings this month",
    "monthly.progress.pace.improvement": "Pace Improvement",
    "monthly.progress.endurance.improvement": "Endurance Improvement",

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

    //Analytics
    "analytics.title": "Analitika vježbanja",
    "analytics.group.title": "Mjesečni Napredak Grupe",

    //Attendance
    "analytics.attendance.title": "Prisustvo po mjesecu (svaka grupa)",

    //Create training
    "create.training.title": "Kreiraj novu trening sesiju",
    "create.training.description":
      "Dizajnirajte trening sesije koje će se automatski sinkronizirati s satovima sportaša",

    //Create training form
    "create.training.form.title": "Naslov Sesije",
    "create.training.form.group": "Grupa",
    "create.training.form.type": "Vrsta Treninga",
    "create.training.form.submit": "Kreiraj Trening Sesiju",
    "create.training.success": "Trening sesija je uspješno kreirana!",
    "create.training.error":
      "Neuspjelo kreiranje trening sesije. Molimo pokušajte ponovno.",
    //DownloadTimes
    "download.benchmark": "Benchmark Performansi Trkača",
    "download.benchmark.description":
      "Preuzmite skup podataka s vremenima trčanja kako biste vidjeli kako stojite. Možete simulirati različite brzine mreže.",
    "download.select.speed": "Odaberite Brzinu:",
    "download.download.data": "Preuzmi Podatke",
    "download.downloading": "Preuzimanje...",
    "download.download.failed":
      "Preuzimanje nije uspjelo. Provjerite je li .NET API pokrenut.",
    "download.benchmark.times": "Benchmark Vremena",
    "download.time": "Vrijeme",
    "download.athlete": "Sportaš",
    "download.distance": "Udaljenost",
    "download.skill.level": "Razina Vještine",
    "download.benchmark.time": "Benchmark Vrijeme",

    //GroupCard
    "group.card.members": "Članovi",
    "group.card.avg.pace": "Prosječni Tempo",

    //GroupOverview
    "group.overview.title": "Pregled Grupa",
    "group.overview.description": "Pratite svoje trening grupe na prvi pogled",
    "group.overview.no.data": "Nema Pronađenih Podataka",

    //Profile
    "profile.title": "Stranica Profila",
    "profile.type.of.user": "Vrsta korisnika",
    "profile.email": "Email",
    "profile.firstname": "Ime",
    "profile.lastname": "Prezime",
    "profile.goToMainPage": "Idi na glavnu stranicu",
    //Settings
    "settings.title": "Postavke",
    //ManageClients
    "manage.clients.title": "Upravljanje Klijentima",
    "manage.clients.description":
      "Pratite i ocjenjujte performanse pojedinih sportaša",
    "manage.clients.no.data": "Nema Pronađenih Klijenata",
    "manage.client.no.data.description":
      "Nema klijenata koji odgovaraju vašim kriterijima.",
    "manage.clients.add": "Dodaj Novog Klijenta",

    //MyGroup
    "mygroup.title": "Performanse Grupe",
    "mygroup.description": "Kako se uspoređujete sa svojom trening grupom",
    // Performance Cards
    "mygroup.avg.pace": "Vaš prosječni tempo",
    "mygroup.consistency.score": "Rezultat Konzistentnosti",

    //Navbar
    "navbar.settings": "Postavke",
    "navbar.logout": "Odjava",
    "navbar.profile": "Profil",

    //MyTrainingGroup
    "mytraininggroup.title": "Moja Trening Grupa",
    "mytraininggroup.description": "Pratite svoje trening grupe na prvi pogled",

    //PersonalRecords
    "personal.records.title": "Osobni Rekordi",
    "personal.records.add": "Dodaj Novi Rekord",
    "personal.record.crud.title": "Upravljanje Osobnim Rekordom",
    "personal.record.crud.add": "Dodaj Rekord",
    "personal.record.crud.title.label": "Naslov",
    "personal.record.crud.time.label": "Vrijeme (MM:SS)",
    "personal.record.crud.date.label": "Datum",
    "personal.record.crud.improvement.label": "Poboljšanje",
    "personal.record.crud.cancel": "Otkaži",
    "personal.record.crud.save": "Spremi Promjene",

    //Strava Sync
    "strava.sync.title": "Strava Sinkronizacija",
    "strava.sync.desc":
      "Automatski sinkronizirajte svoje aktivnosti trčanja sa Strava",
    "strava.connect.description": "Poveži se sa Strava",
    "strava.connected.as": "Povezano kao",
    "strava.recent.activities": "Nedavne Aktivnosti",
    "strava.loading": "Učitavanje...",
    "strava.no.activities": "Nema pronađenih nedavnih aktivnosti.",
    "strava.error": "Greška",
    "strava.disconnect.button": "Prekini vezu",

    //Training History
    "training.history.title": "Povijest Treninga",
    "training.history.description":
      "Vaše performanse i povratne informacije trenera iz nedavnih sesija",

    //Client
    "client.overview": "Pregled",
    "client.training.history": "Povijest Treninga",
    "client.my.group": "Moja Grupa",
    "client.progress": "Napredak",
    "client.strava.sync": "Strava Sinkronizacija",

    //Coach
    "coach.overview": "Pregled",
    "coach.analytics": "Analitika",
    "coach.manage.clients": "Upravljanje Klijentima",
    "coach.create.training": "Kreiraj Trening",
    "coach.attendance": "Prisustvo",
    "coach.view": "Trener",

    //TrainingSession
    "training.session.title": "Detalji Trening Sesije",
    "training.session.dialog.title": "Naslov",
    "training.session.dialog.type": "Vrsta",
    "training.session.dialog.group": "Grupa",
    "training.session.dialog.date": "Datum",
    "training.session.dialog.duration": "Trajanje",
    "training.session.dialog.intervals": "Intervali",
    "training.session.dialog.rest": "Odmor",
    "training.session.dialog.attendance": "Prisustvo",
    "training.session.dialog.completed": "Dovršeno",

    //MonthlyProgress
    "monthly.progress.title": "Mjesečni Napredak",
    "monthly.progress.trainings": "Treninzi ovaj mjesec",
    "monthly.progress.pace.improvement": "Poboljšanje tempa",
    "monthly.progress.endurance.improvement": "Poboljšanje izdržljivosti",

    //UpcomingTrainingSessions
    "upcoming.training.title": "Izvještaj o Trening Sesijama",
    "upcoming.training.export.excel": "Izvezi u Excel",
    "upcoming.training.export.pdf": "Izvezi u PDF",
    "upcoming.training.print": "Ispis",
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
