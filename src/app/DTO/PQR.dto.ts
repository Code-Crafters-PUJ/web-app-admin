export interface PQRDTO
{
    client_id:number,
    company_name:string,
    description:string,
    id:number,
    email:string,
    petition_date:Date,
    petition_type:string,
    state:string,
    subject:string,
}
export interface clientDTO
{
    id:number,
    company_name:string,
    contact_name:string,
    email:string,
    telephone:string,
    nit:string,
    status:boolean
}
export interface clientPQRDTO
{
    client_id:number,
    description:string,
    id:number,
    petition_date:Date,
    petition_type:string,
    state:string,
    subject:string,
}