export interface PlanDTO {
  type: string,
  mensualPrice: number;
  semestralPrice: number;
  anualPrice: number;
  state: string;
  numAccounts: number;
  services: string[];
}
