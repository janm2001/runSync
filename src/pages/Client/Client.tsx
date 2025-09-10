import Header from "@/components/Header/Header";
import MainTabs from "@/components/MainTabs/MainTabs";
import StatsCard from "@/components/StatsCard/StatsCard";
import { useLanguage } from "@/context/LanguageContext";
import { Container, Grid } from "@chakra-ui/react";

const Client = () => {
  const { t } = useLanguage();

  const mainTabsConfig = {
    view: t("client.view"),
    firstTab: { label: t("client.overview"), value: "overview" },
    secondTab: {
      label: t("client.training.history"),
      value: "training-history",
    },
    thirdTab: { label: t("client.my.group"), value: "my-group" },
    fourthTab: { label: t("client.progress"), value: "progress" },
    fifthTab: { label: t("client.strava.sync"), value: "strava-sync" },
  };
  return (
    <>
      <Header
        headerTitle={t("dashboard.welcome.client")}
        headerText={t("dashboard.subtitle.client")}
      />
      <Container width="80%" mx="auto" mt={4}>
        <Grid templateColumns="repeat(4, 1fr)" gap="6" mt={4}>
          <StatsCard
            title={t("stats.group.members")}
            icon="users"
            statNumber={12}
            info="+2 from last month"
          />
          <StatsCard
            title={t("stats.trainings.month")}
            icon="chart-pie"
            statNumber={8}
            info="2 more than last month"
          />
          <StatsCard
            title={t("stats.personal.best")}
            icon="calendar"
            statNumber={25}
            info="5K time"
          />
          <StatsCard
            title={t("stats.progress.score")}
            icon="chart-line"
            statNumber={92}
            info="+5 from last month"
          />
        </Grid>
        <MainTabs
          view={mainTabsConfig.view}
          firstTab={mainTabsConfig.firstTab}
          secondTab={mainTabsConfig.secondTab}
          thirdTab={mainTabsConfig.thirdTab}
          fourthTab={mainTabsConfig.fourthTab}
          fifthTab={mainTabsConfig.fifthTab}
        />
      </Container>
    </>
  );
};

export default Client;
