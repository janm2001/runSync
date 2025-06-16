export interface ICreateTrainingForm {
    title: string;
    group: 'spansko 3' | 'spansko 4' | 'spansko 5' | 'spansko 6' | '';
    trainingType: 'Long Run' | 'Interval Run' | 'Tempo Run' | 'Hill Repeats' | 'Fartlek' | 'Recovery Run' | '';
    date: string;
    duration: number;
    distance: number;
    trainingDescription: string;
}

export type Action =
    | {
        type: 'UPDATE_FIELD';
        payload: {
            field: keyof ICreateTrainingForm;
            value: string | number;
        };
    }
    | { type: 'RESET_FORM' };