import Header from "@/components/Header/Header";
import MainTabs from "@/components/MainTabs/MainTabs";
import StatsCard from "@/components/StatsCard/StatsCard";
import { Container, Grid } from "@chakra-ui/react";

const Client = () => {
  const mainTabsConfig = {
    view: "client",
    firstTab: { label: "Overview", value: "overview" },
    secondTab: { label: "Training History", value: "training-history" },
    thirdTab: { label: "My Group", value: "my-group" },
    fourthTab: { label: "Progress", value: "progress" },
  };
  return (
    <>
      <Header
        headerTitle="Welcome back Runner!"
        headerText="Track your progress and stay connected with your training group"
      />
      <Container width="80%" mx="auto" mt={4}>
        <Grid templateColumns="repeat(4, 1fr)" gap="6" mt={4}>
          <StatsCard
            title="Group Members"
            icon="users"
            statNumber={12}
            info="+2 from last month"
          />
          <StatsCard
            title="Training This Month"
            icon="chart-pie"
            statNumber={8}
            info="2 more than last month"
          />
          <StatsCard
            title="Personal Best"
            icon="calendar"
            statNumber={25}
            info="5K time"
          />
          <StatsCard
            title="Progress Score"
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
        />
      </Container>
    </>
  );
};

export default Client;
