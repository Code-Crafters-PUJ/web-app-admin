export interface AccountDTO {
    connected: boolean;
    credentials:CredentialDTO[]
    first_name: string;
    id_card: string;
    idcuenta: number;
    last_login: Date;
    last_name: string;
    reports:ReportDTO[]
    role: string;
  }
  
  export interface CredentialDTO {
    email: string;
    id: number;
    idcuenta: number;
  }
  
  export interface ReportDTO {
    account_id: number;
    activity: string;
    date: Date;
    id: number;
  }