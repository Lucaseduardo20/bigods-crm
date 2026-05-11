export type UserType = {
    id: number;
    company_id?: number;
    name: string;
    email: string;
    tel?: string | null;
    role: string;
    company_name: string;
    commission: string;
    photo?: string;
};

export type UserSchedule = {
    date: string,
    start_time: string,
    end_time: string,
    periods?: TimeRanges[]
}
