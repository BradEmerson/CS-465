import { Routes } from '@angular/router';
import { TripListingComponent } from './trip-listing/trip-listing.component'; // Changed to troubleshoot (BME 2/13/2025)
import { AddTripComponent } from './add-trip/add-trip.component'; // Added (BME 2/15/2025)
import { EditTripComponent } from './edit-trip/edit-trip.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [ 
    { path: 'add-trip', component: AddTripComponent, canActivate: [AuthGuard] }, // Added (BME 2/15/2025) // Added AuthGuard 2/18/2025
    { path: '', component: HomeComponent, pathMatch: 'full' }, // Added because page was not receiving any routes (BME 2/13/2025) // Updated with pathmatch (BME 2/18/2025)
    //{ path: '', redirectTo: '/list-trips', pathMatch: 'full'},
    { path: 'edit-trip', component: EditTripComponent, canActivate: [AuthGuard]}, // Added (BME 2/15/2025) // Added AuthGuard 2/18/2025
    { path: 'login', component: LoginComponent}, // Added (BME 2/18/2025)
    { path: 'list-trips', component: TripListingComponent}  // Added (BME 2/18/2025)
   
];


