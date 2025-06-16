import { FaUsers, FaChartPie, FaCalendar, FaChartLine } from "react-icons/fa";
import type { IconType } from "react-icons"; // Import IconType for react-icons

export interface IStatCard {
    title: string;
    icon: string;
    statNumber: number;
    info: string;
}

export type IconKey = "users" | "chart-pie" | "calendar" | "chart-line";

// The iconMap now maps string keys to React component types
export const iconMap: Record<IconKey, IconType> = {
    users: FaUsers,
    "chart-pie": FaChartPie,
    calendar: FaCalendar,
    "chart-line": FaChartLine,
};