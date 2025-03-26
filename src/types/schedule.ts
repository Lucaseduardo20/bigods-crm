
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
    start: string;
    end: string;
};

export type ScheduleListProps = {
    schedules: DateSchedule[];
    formatDate: (date: string) => string;
    onRemove: (date: string, index: number) => void;
};

export type ScheduleItemProps = {
    period: TimeRange;
    onRemove: () => void;
};

export type SubmitButtonProps = {
    isLoading: boolean;
    disabled: boolean;
    onClick: () => void;
};