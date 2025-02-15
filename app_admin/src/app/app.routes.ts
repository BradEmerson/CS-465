import { Routes } from '@angular/router';
import { TripListingComponent } from './trip-listing/trip-listing.component'; // Changed to troubleshoot (BME 2/13/2025)
import { AddTripComponent } from './add-trip/add-trip.component'; // Added (BME 2/15/2025)
import { EditTripComponent } from './edit-trip/edit-trip.component';

export const routes: Routes = [ 
    { path: 'add-trip', component: AddTripComponent }, // Added (BME 2/15/2025)
    { path: '', component: TripListingComponent }, // Added because page was not receiving any routes (BME 2/13/2025)
    { path: 'edit-trip', component: EditTripComponent} // Added (BME 2/15/2025)
];
