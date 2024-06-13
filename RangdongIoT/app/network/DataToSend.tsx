export interface DataToSend {
    name: string;
    mac: string;
    status: boolean;
  }

export interface DataAuthen {
    username: string;
    password: string;
}

export interface DateUpdate {
  mac: string;
  name: string;
  status: boolean; 
}

export interface DataSignup {
    email: string;
    username: string;
    password: string;
}

export interface DataOTP {
    email: string;
}

export interface DataCode {
  email: string;
  otp: string;
}

export interface DataFilter {
  field: string; 
  value: string; 
}

export interface DataProfile {
  gender: string; 
  birthdate: string;
}