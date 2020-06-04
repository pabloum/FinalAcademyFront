import { ProductVM } from "./product-VM";

export class TravelPackageDetailVM {
    PackageId : number;
    PackageName : string;
    Products : Array<ProductVM> = [];
}