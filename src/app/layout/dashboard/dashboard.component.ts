import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { DashboardService } from 'src/app/shared/services/dashboard.service';
import { ClientTypeVM } from 'src/app/shared/model/client-type-VM';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Reservation } from 'src/app/shared/model/calculate-commission-request-VM';
import { TravelPackageVM } from 'src/app/shared/model/travel-package-vm';
import { TravelPackageDetailVM } from 'src/app/shared/model/travel-package-detail-vm';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
    alerts: Array<any> = [];
    clientTypeList : Array<ClientTypeVM> = [];
    travelPackageList : Array<TravelPackageVM> = [];
    selectedTravelPackageList : Array<TravelPackageVM> = [];
    selectedTravelPackage : TravelPackageDetailVM = null;
    calculatedCommision : number;
    
    dashboardForm = new FormGroup({
        clientType : new FormControl('', Validators.required),
        passengersAmmount : new FormControl('', Validators.required),
        tripDuration : new FormControl('', Validators.required),
        travelPackageDescription : new FormControl(''),
        selectedTravelPackage : new FormControl('')
    });
    
    constructor(private dashboardService : DashboardService, private formBuilder: FormBuilder) {

    }

    ngOnInit()
    {
        this.dashboardService.getAllClientTypes().subscribe(
            response => {
                this.clientTypeList = response
            },
            error => {
                this.createNotificationMessage("danger", error.message);
            }
        );
        
        this.getTravelPackages();
    }

    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }

    getTravelPackages()
    {
        let description = this.dashboardForm.controls.travelPackageDescription.value;

        this.dashboardService.getTravelPackagesByDescription(description).subscribe(
            response => {
                this.travelPackageList = response
            },
            error => {
                this.createNotificationMessage("danger", error.message);
            }
        );
    }

    selectTravelPackage()
    {
        let selectedTravelPackage = this.dashboardForm.controls.selectedTravelPackage.value;

        if(selectedTravelPackage != "")
            this.selectedTravelPackageList.push(selectedTravelPackage);
    }

    viewTravelPackageDetails(travelPackageId : number)
    {
        this.dashboardService.getTravelPackageById(travelPackageId).subscribe(
            response => {
                this.selectedTravelPackage = response
            },
            error => {
                this.createNotificationMessage("danger", error.message);
            }
        );
    }

    removeTravelPackage(travelPackage : TravelPackageVM)
    {
        this.selectedTravelPackageList = this.selectedTravelPackageList.filter(x => x !== travelPackage);
        this.selectedTravelPackage = null;
    }

    onSubmit()
    {
        let calculateCommissionRequest = new Reservation();

        calculateCommissionRequest.ClientTypeId = this.dashboardForm.controls.clientType.value;
        calculateCommissionRequest.AmountTravelers = this.dashboardForm.controls.passengersAmmount.value;
        calculateCommissionRequest.DurationStay = this.dashboardForm.controls.tripDuration.value; 

        calculateCommissionRequest.PackageId = this.selectedTravelPackageList[0].PackageId; 

        this.selectedTravelPackageList.forEach(travelPackage => {
            calculateCommissionRequest.TravelPackageIds.push(travelPackage.PackageId);
        });

        this.dashboardService.calculateCommission(calculateCommissionRequest)
        .subscribe(
            response => {
                this.calculatedCommision = response
                this.createNotificationMessage("success", response.Message);
            },
            error => {
                this.createNotificationMessage("danger", error.message);
            }
        );
    }

    private createNotificationMessage(type : string, message : string)
    {
        this.alerts.push({
            id: 1,
            type: type,
            message: message
        });
    }
}
