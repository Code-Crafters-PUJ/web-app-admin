export interface AccountDTO {
    connected: boolean;
    first_name: string;
    id_card: string;
    idcuenta: number;
    last_login: Date;
    last_name: string;
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

  export interface AuxiliarCredential
  {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    last_login: Date|null;
    Rol:string;
    Report:ReportDTO|null;
  }