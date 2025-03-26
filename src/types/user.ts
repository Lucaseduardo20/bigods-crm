export type UserType = {
    id: number;
    name: string;
    email: string;
    tel: string;
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