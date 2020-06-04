export class Reservation {
    ClientTypeId : number;
    AmountTravelers : number;
    DurationStay : number;
    PackageId : number;
    TravelPackageIds : Array<number> = new Array<number>();
}
