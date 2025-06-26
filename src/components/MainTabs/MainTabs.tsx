import { Tabs } from "@chakra-ui/react";
import type { IMainTabs } from "./types";
import GroupOverview from "../GroupOverview/GroupOverview";
import UpcomingTrainingSessions from "../UpcomingTrainingSessions/UpcomingTrainingSessions";
import ManageClients from "../ManageClients/ManageClients";
import CreateTraining from "../CreateTraining/CreateTraining";
import Analytics from "../Analytics/Analytics";
import MyTrainingGroup from "../MyTrainingGroup/MyTrainingGroup";
import TrainingHistory from "../TrainingHistory/TrainingHistory";
import MyGroup from "../MyGroup/MyGroup";
import ClientProgress from "@/pages/ClientProgress/ClientProgress";

const MainTabs = ({
  view,
  firstTab,
  secondTab,
  thirdTab,
  fourthTab,
}: IMainTabs) => {
  return (
    <Tabs.Root
      defaultValue={firstTab.value}
      orientation="horizontal"
      mt={8}
      fitted
      variant={"line"}
    >
      <Tabs.List gap={1}>
        <Tabs.Trigger value={firstTab.value}>{firstTab.label}</Tabs.Trigger>
        <Tabs.Trigger value={secondTab.value}>{secondTab.label}</Tabs.Trigger>
        <Tabs.Trigger value={thirdTab.value}>{thirdTab.label}</Tabs.Trigger>
        <Tabs.Trigger value={fourthTab.value}>{fourthTab.label}</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value={firstTab.value}>
        {view === "coach" ? (
          <>
            <GroupOverview />
            <UpcomingTrainingSessions />
          </>
        ) : (
          <>
            <MyTrainingGroup />
            <UpcomingTrainingSessions />
          </>
        )}
      </Tabs.Content>
      <Tabs.Content value={secondTab.value}>
        {view === "coach" ? <ManageClients /> : <TrainingHistory />}
      </Tabs.Content>
      <Tabs.Content value={thirdTab.value}>
        {view === "coach" ? <CreateTraining /> : <MyGroup />}
      </Tabs.Content>
      <Tabs.Content value={fourthTab.value}>
        {view === "coach" ? <Analytics /> : <ClientProgress />}
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default MainTabs;
