import { Component, OnInit } from '@angular/core'; // Added OnInit arg (BME 2/13/2025)
import { CommonModule } from '@angular/common';
import { TripCardComponent } from '../trip-card/trip-card.component';

import { Trip } from '../models/trip'; // Added (BME 2/15/2025)
import { TripDataService } from '../services/trip-data.service'; // Added (BME 2/15/2025)

import { Router  } from '@angular/router'; // Added (BME 2/15/2025)

import { AuthenticationService } from '../services/authentication.service'; // Added (BME 2/18/2025)



@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, TripCardComponent],
  templateUrl: './trip-listing.component.html',
  styleUrls: ['./trip-listing.component.css'],
  providers: [TripDataService] // Added (BME 2/15/2025)
})

export class TripListingComponent implements OnInit { // Adjusted for individual trip data (BME 2/15/2025)
  trips!: Trip[];
  message: string = '';

  constructor(
    private tripDataService: TripDataService,
    private router: Router, // Added (BME 2/15/2025)
    private authenticationService: AuthenticationService // Added (BME 2/18/2025)
  ) {
    console.log('trip-listing constructor');
  }

  public addTrip(): void {  // Added addTrip method definition (BME 2/15/2025)
    this.router.navigate(['add-trip']);
  }

  private getStuff(): void {
    console.log("getStuff() is running...");

    this.tripDataService.getTrips().subscribe({
        next: (value: any) => {
            console.log("Trips received:", value);  // ✅ Log the API response
            this.trips = value;
            if (value.length > 0) {
                this.message = `There are ${value.length} trips available.`;
            } else {
                this.message = "There were no trips retrieved from the database";
            }
            console.log(this.message);
        },
        error: (error: any) => {
            console.error("Error fetching trips:", error);  // ❌ Log any errors
        }
    });
}


  ngOnInit(): void {
    console.log('ngOnInit');
    this.getStuff();
  }

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

}