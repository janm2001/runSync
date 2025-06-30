export interface ICreateTrainingForm {
    title: string;
    group: 'spansko 3' | 'spansko 4' | 'spansko 5' | 'spansko 6' | '';
    trainingType: 'Long Run' | 'Interval Run' | 'Tempo Run' | 'Hill Repeats' | 'Fartlek' | 'Recovery Run' | '';
    date: string;
    intervals: IInterval[];
    duration: number;
    distance: number;
    trainingDescription: string;
}

export interface IInterval {
    id: string; // Unique ID for mapping
    repetitions: number;
    distance: number; // in meters
    pace: string; // format "MM:SS"
    rest: string; // e.g., "200m jog" or "60s"
}

export type Action =
    | {
        type: 'UPDATE_FIELD';
        payload: {
            field: keyof ICreateTrainingForm;
            value: string | number;
        };
    }
    | {
        type: 'SET_INTERVALS';
        payload: IInterval[]
        ;
    }
    | { type: 'RESET_FORM' };