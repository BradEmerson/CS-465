import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trip';
import { HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.css']
})

// Implement OnInit because the component does some heavy lifting when it is instantiated. (BME 2/15/2025)
export class EditTripComponent implements OnInit {

  public editForm!: FormGroup;
  trip!: Trip;
  submitted = false;
  message: string = "";

  // Constructor initializes the form builder, router, trip data service, and authentication service
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripDataService: TripDataService,
    private authenticationService: AuthenticationService  // Added missing injection for authenticationService
  ) {}

  // ngOnInit method retrieves trip data and populates the form (BME 2/15/2025)
  ngOnInit(): void {
    // Retrieve stashed trip ID
    let tripCode = localStorage.getItem("tripCode");
    if (!tripCode) {
      alert("Something went wrong, couldn’t find where I stashed tripCode!");
      this.router.navigate([""]);
      return;
    }

    console.log('EditTripComponent::ngOnInit');
    console.log('tripCode:', tripCode);

    // Initialize the form with required fields (BME 2/15/2025)
    this.editForm = this.formBuilder.group({
      _id: [],
      code: [tripCode, Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required]
    });

    // Fetch trip data based on tripCode (BME 2/15/2025)
    this.tripDataService.getTrip(tripCode).subscribe({
      next: (value: any) => {
        this.trip = value;
        this.editForm.patchValue(value[0]); // Populate form fields (BME 2/15/2025)

        this.message = value ? `Trip: ${tripCode} retrieved` : 'No Trip Retrieved!';
        console.log(this.message);
      },
      error: (error: any) => {
        console.log('Error:', error);
      }
    });
  }

  // onSubmit method handles form submission and updates the trip data (BME 2/15/2025) // Updated 2/18/2025
  public onSubmit(): void {
    this.submitted = true;

    if (this.editForm.valid) {

      const token = this.authenticationService.getToken(); // New (BME 2/18/2025)
      console.log('Token: ', token);
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // New (BME 2/18/2025)

      this.tripDataService.updateTrip(this.editForm.value, { headers }).subscribe({
        next: (value: any) => {
          console.log(value);
          this.router.navigate([""]);
        },
        error: (error: any) => {
          console.log('Error:', error);
        }
      });
    }
  }

  // Quick-access method to get form controls (BME 2/15/2025)
  get f() { return this.editForm.controls; }
}
