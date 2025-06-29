import Header from "@/components/Header/Header";
import MainTabs from "@/components/MainTabs/MainTabs";
import StatsCard from "@/components/StatsCard/StatsCard";
import { useLanguage } from "@/context/LanguageContext";
import { Container, Grid } from "@chakra-ui/react";

const Coach = () => {
  const mainTabsConfig = {
    view: "coach",
    firstTab: { label: "Overview", value: "overview" },
    secondTab: { label: "Manage Clients", value: "manage-clients" },
    thirdTab: { label: "Create Training", value: "create-training" },
    fourthTab: { label: "Analytics", value: "analytics" },
  };
  const { t } = useLanguage();
  return (
    <>
      <Header
        headerTitle={t("dashboard.welcome.coach")}
        headerText="Manage your groups and track performance across all your athletes"
      />
      <Container width="80%" mx="auto" mt={4}>
        <Grid templateColumns="repeat(4, 1fr)" gap="6" mt={4}>
          <StatsCard
            title="Total Athletes"
            icon="users"
            statNumber={24}
            info="+2 from last month"
          />
          <StatsCard
            title="Active Groups"
            icon="chart-pie"
            statNumber={3}
            info="Across all levels"
          />
          <StatsCard
            title="This Week's Sessions"
            icon="calendar"
            statNumber={12}
            info="Schedule sessions"
          />
          <StatsCard
            title="Avg Performance"
            icon="chart-line"
            statNumber={87}
            info="+5 from last month"
          />
        </Grid>
        <MainTabs
          view={mainTabsConfig.view}
          firstTab={mainTabsConfig.firstTab}
          secondTab={mainTabsConfig.secondTab}
          thirdTab={mainTabsConfig.thirdTab}
          fourthTab={mainTabsConfig.fourthTab}
        />
      </Container>
    </>
  );
};

export default Coach;
