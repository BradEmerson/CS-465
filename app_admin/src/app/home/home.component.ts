import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Added to fix execution error when starting server (BME 2/18/2025)
import { AuthenticationService } from '../services/authentication.service';
import { TripListingComponent } from '../trip-listing/trip-listing.component';
import { Trip } from '../models/trip';
import { TripDataService } from '../services/trip-data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TripListingComponent], // Added to fix execution error when starting server (BME 2/18/2025)
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {
  trips: Trip[] = [];
  message: string = '';

  constructor(
    private authenticationService: AuthenticationService,
    private tripDataService: TripDataService
  ) {} // Added to address server execution error (BME 2/18/2025)

  ngOnInit(): void {
    console.log("HomeComponent initialized");
    if (this.isLoggedIn()) {
      this.loadTrips();
    } // Added to address server execution error (BME 2/18/2025)
  }

  public isLoggedIn(): boolean { // Added to address server execution error (BME 2/18/2025)
    return this.authenticationService.isLoggedIn();
  }

  private loadTrips(): void { // Added for debugging, and to address blank home screen (BME 2/18/2025)
    console.log("Fetching trips...");
    this.tripDataService.getTrips().subscribe({
      next: (data) => {
        this.trips = data;
        console.log("Trips received:", data);
        this.message = data.length > 0 ? `There are ${data.length} trips available.` : "No trips found.";
      },
      error: (err) => console.error("Error fetching trips:", err)
    });
  }
}
