import { DecimalPipe } from "@angular/common";
import { ProductType } from "./product-type";

export class ProductVM {
    ProductId : number;
    ProductType : ProductType;
    ProductName : string;
    Category : number;
}