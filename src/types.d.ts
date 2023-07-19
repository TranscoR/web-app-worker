export interface Student {
  index: number;
  active_account: boolean;
  uid: string;
  student_name: string;
  email: any;
  password?: any;
  school_name: string;
  education: string;
  grade: string;
  turn: string;
  tutor_name: string;
  house_phone_number: number;
  phone_number: number;
  subtutor_name: string;
  subtutor_phone_number: number;
  address: string;
  first_street_reference: string;
  second_street_reference: string;
  house_color: string;
  door_color: string;
  weeks: any;
  school_cycle: any;
}

export interface Children {
  children: React.ReactNode;
}

export interface Day {
  date: any;
  day: number;
  label_date: string;
  label_day: string;
  paid: boolean;
}
