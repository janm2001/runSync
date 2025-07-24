import type { Training } from "@/data/dummyData";

export interface ITrainingSessionCard {
    session: Training;
    fetchTrainingSessions?: () => void; // Optional callback to fetch training sessions after deletion
}