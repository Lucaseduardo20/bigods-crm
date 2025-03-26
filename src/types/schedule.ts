
export type AddScheduleModalProps = {
    // onAdd: (schedule: DateSchedule) => void;
    onClose: () => void;
    setLoading: (loading: boolean) => void
};

export type DateSchedule = {
    date: string;
    periods: TimeRange[];
};

export type TimeRange = {
    id: number;
    start: string;
    end: string;
};

export type ScheduleListProps = {
    schedules: DateSchedule[];
    formatDate: (date: string) => string;
};

export type ScheduleItemProps = {
    id?: number;
    period: TimeRange;
};

export type SubmitButtonProps = {
    isLoading: boolean;
    disabled: boolean;
    onClick: () => void;
};