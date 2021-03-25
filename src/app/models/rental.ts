export interface Rental{
    id?:number;
    carId:number;
    firstName:string;
    lastName:string;
    companyName:string;
    rentDate:Date;
    returnDate?:Date;
    customerId:number;
}