export interface ITab {
    value: string;
    label: string;
}

export interface IMainTabs {
    view: string;
    firstTab: ITab;
    secondTab: ITab;
    thirdTab: ITab;
    fourthTab: ITab;
}