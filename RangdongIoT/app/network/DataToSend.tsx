export interface DataToSend {
    name: string;
    mac: string;
    status: boolean;
  }

export interface DataAuthen {
    username: string;
    password: string;
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
  code: string;
}