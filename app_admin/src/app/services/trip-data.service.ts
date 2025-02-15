// Added 3 dependencies (BME 2/15/2025)
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'; //1 (BME 2/15/2025)
import { Observable } from 'rxjs'; //2 (BME 2/15/2025)

import { Trip } from '../models/trip'; //3 (BME 2/15/2025)

@Injectable({
  providedIn: 'root'
})

export class TripDataService { // Edited TripDataService to pull trip data (BME 2/15/2025)

  constructor(private http: HttpClient) { }

  url = 'http://localhost:3000/api/trips'; // Edited (pulled out of getTrips) (BME 2/15/2025)

  getTrips() : Observable<Trip[]> {    
    return this.http.get<Trip[]>(this.url);
  }

  addTrip(formData: Trip) : Observable<Trip> {  // Added (BME 2/15/2025)
    return this.http.post<Trip>(this.url, formData);
  }

  getTrip(tripCode: string) : Observable<Trip[]> {  // Added (BME 2/15/2025)
    return this.http.get<Trip[]>(this.url + '/' + tripCode);
  }

  updateTrip(formData: Trip) : Observable<Trip> {  // Added (BME 2/15/2025)
    return this.http.put<Trip>(this.url + '/' + formData.code, formData);
  }
}
