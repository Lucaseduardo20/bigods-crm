export type loginData = {
    email: string,
    password: string
}

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