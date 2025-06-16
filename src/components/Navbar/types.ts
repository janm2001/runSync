export type ViewTab = 'client' | 'coach';

export interface INavbar {
    activeTab: ViewTab;
    setActiveTab: (tab: ViewTab) => void;
}
