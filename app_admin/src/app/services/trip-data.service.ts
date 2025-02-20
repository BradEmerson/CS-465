// Added 3 dependencies (BME 2/15/2025)
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //1 (BME 2/15/2025)
import { Observable } from 'rxjs'; //2 (BME 2/15/2025)
import { HttpHeaders } from '@angular/common/http';

import { Trip } from '../models/trip'; //3 (BME 2/15/2025)
import { User } from '../models/user';
import { AuthResponse } from '../models/authresponse';
import { BROWSER_STORAGE } from '../storage';

@Injectable({
  providedIn: 'root'
})

export class TripDataService { // Edited TripDataService to pull trip data (BME 2/15/2025)

  constructor(private http: HttpClient, @Inject(BROWSER_STORAGE) private storage: Storage) { }

  private apiBaseUrl: string = 'http://localhost:3000/api'; // Added to fix syntax error, as this variable was undefined per guide code. (BME 2/18/2025)
  url = 'http://localhost:3000/api/trips'; // Edited (pulled out of getTrips) (BME 2/15/2025)

  getTrips() : Observable<Trip[]> {    
    return this.http.get<Trip[]>(this.url);
  }

  addTrip(formData: Trip) : Observable<Trip> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.storage.getItem('travlr-token')}`);
    return this.http.post<Trip>(this.url, formData, { headers });
  }

  /*addTrip(formData: Trip) : Observable<Trip> {  // Added (BME 2/15/2025)
    return this.http.post<Trip>(this.url, formData);
  }*/

  getTrip(tripCode: string) : Observable<Trip[]> {  // Added (BME 2/15/2025)
    return this.http.get<Trip[]>(this.url + '/' + tripCode);
  }

  updateTrip(updatedTripData: any, options: any): Observable<any> {
    const url = `${this.apiBaseUrl}/trips/${updatedTripData.code}`; // URL for the PUT request
    return this.http.put(url, updatedTripData, options);  // Pass the headers as part of the options
}


  /*updateTrip(formData: Trip) : Observable<Trip> {  // Added (BME 2/15/2025)
    return this.http.put<Trip>(this.url + '/' + formData.code, formData);
  }*/

  public login(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('login', user);
  }
  
  public register(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('register', user);
  }
  
  private makeAuthApiCall(urlPath: string, user: User): Promise<AuthResponse> {
    const url: string = `${this.apiBaseUrl}/${urlPath}`;
    return this.http
      .post(url, user)
      .toPromise()
      .then(response => response as AuthResponse) // Changed code to fix syntax error (BME 2/18/2025)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {  // Added missing `handleError` method to fix undefined syntax error (BME 2/18/2025)
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
  
  
}
