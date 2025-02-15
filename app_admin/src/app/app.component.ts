import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
//import { TripListingComponent } from './trip-listing/trip-listing.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet], // Removved TripListingComponent, as it was loading twice.  (BME 2/13/2025)
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Travlr Getaways Admin!';
}
