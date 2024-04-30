export interface MarketingRequestDto {
    subject: string;
    recipient: string;
    description: string;
  }

  export interface SenderDto {
    name: string;
    email: string;
    date: string;
  }
  
  export interface UserHistoryDto {
    id: number;
    subject: string;
    company: string;
    addressee: string;
    description: string;
    sender: SenderDto;
  }
  
  export interface UserHistoryResponse {
    history: UserHistoryDto[];
  }

  export interface GraphData {
    activos: number[];
    monitoreoMes: number[];
    monitoreoTipo: {
      administrativo: number;
      ventas: number;
      marketing: number;
      soporte: number;
    };
  }
  
  