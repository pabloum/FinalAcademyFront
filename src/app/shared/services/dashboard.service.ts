import { Injectable } from '@angular/core';
import { ClientTypeVM } from '../model/client-type-VM';
import { ProductType } from '../model/product-type';
import { Reservation } from '../model/calculate-commission-request-VM';
import { TravelPackageVM } from '../model/travel-package-vm';
import { TravelPackageDetailVM } from '../model/travel-package-detail-vm';
import { ProductVM } from '../model/product-VM';
import { CommissionResultVM } from '../model/commission-result-VM';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http : HttpClient) { }

  getAllClientTypes() : Observable<any>
  {
    /* Replace this with API call */
    return this.http.get<Observable<any>>("http://localhost:49321/api/clients");
  }
  
  getTravelPackagesByDescription(description : string) : Observable<any>
  {
    /* Replace this with API call */
    return this.http.get<Observable<any>>("http://localhost:49321/api/packages?description=" + description);
  }

  getTravelPackageById(travelPackageId : number) : Observable<any>
  {
    /* Replace this with API call */
    return this.http.get<Observable<any>>("http://localhost:49321/api/packages/" + travelPackageId);
  }

  calculateCommission(calculateCommissionRequestVM : Reservation) : any
  {
    /* Replace this with API call */
    return this.http.post("http://localhost:49321/api/comission", calculateCommissionRequestVM);
  }

  private generateClientTypeVMMockData() : Array<ClientTypeVM>
  {
    let client1 = new ClientTypeVM();
    client1.ClientTypeId = 1;
    client1.Description = "Individual";    

    let client2 = new ClientTypeVM();
    client2.ClientTypeId = 2;
    client2.Description = "Corporate";
    
    let list = new Array<ClientTypeVM>();
    list.push(client1);
    list.push(client2);

    return list;
  }

  private generateTravelPackageVMMockData() : Array<TravelPackageVM>
  {
    let travelPackageVM1 = new TravelPackageVM();
    travelPackageVM1.PackageId = 1;
    travelPackageVM1.PackageName = "Bariloche Premium";

    let travelPackageVM2 = new TravelPackageVM();
    travelPackageVM2.PackageId = 2;
    travelPackageVM2.PackageName = "Tucumán";

    let list = new Array<TravelPackageVM>();
    list.push(travelPackageVM1);
    list.push(travelPackageVM2);

    return list;
  }

  private generateTravelPackageDetailMockData() : Array<TravelPackageDetailVM>
  {
    //Travel Package 1
    let travelPackage1 = new TravelPackageDetailVM();
    travelPackage1.PackageId = 1;
    travelPackage1.PackageName = "Bariloche Premium";

    let product1 = new ProductVM();
    product1.ProductId = 1;
    product1.ProductName = "Pasaje Aereo Primera clase";    
    product1.Category = null;
    product1.ProductType.ProductName = "Airplane Tickets";

    let product2 = new ProductVM();
    product2.ProductId = 2;
    product2.ProductName = "Alquiler Auto";    
    product2.Category = 2;
    product2.ProductType.ProductName = "Car Rental";

    let product3 = new ProductVM();
    product3.ProductId = 3;
    product3.ProductName = "Hotel 3 estrellas";    
    product3.Category = null;
    product3.ProductType.ProductName = "Hotel";

    travelPackage1.Products.push(product1);
    travelPackage1.Products.push(product2);
    travelPackage1.Products.push(product3);

    //Travel Package 2 
    let travelPackage2 = new TravelPackageDetailVM();
    travelPackage2.PackageId = 2;
    travelPackage2.PackageName = "Tucumán";

    let product4 = new ProductVM();
    product4.ProductId = 4;
    product4.ProductName = "Pasaje Aereo clase Económica";    
    product4.Category = null;
    product4.ProductType.ProductName = "Airplane Tickets";

    let product5 = new ProductVM();
    product5.ProductId = 5;
    product5.ProductName = "Hotel 2 estrellas";    
    product5.Category = null;
    product5.ProductType.ProductName = "Hotel";

    travelPackage2.Products.push(product4);
    travelPackage2.Products.push(product5);

    //Adding Travel Packages to the list
    let travelPackageList = new Array<TravelPackageDetailVM>();
    travelPackageList.push(travelPackage1);
    travelPackageList.push(travelPackage2);

    return travelPackageList;
  }
}
