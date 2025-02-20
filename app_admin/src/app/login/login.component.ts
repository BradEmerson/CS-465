import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user';
import { CommonModule } from '@angular/common'; // Added to fix execution error when starting server (BME 2/18/2025)
import { FormsModule } from '@angular/forms'; // Added to fix execution error when starting server (BME 2/18/2025)

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule], // Added to fix execution error when starting server (BME 2/18/2025)
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public formError: string = '';
  public credentials = {
    name: '',
    email: '',
    password: ''
  };

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {}

  public onLoginSubmit(evt: Event): void {  //  Fix: Accept event parameter (BME 2/18/2025)
    evt.preventDefault();  //  Prevents page reload (BME 2/18/2025)
    this.formError = '';
  
    if (!this.credentials.email || !this.credentials.password) {
      this.formError = 'All fields are required, please try again';
    } else {
      this.doLogin();
    }
  }
  

  /*public onLoginSubmit(): void {
    this.formError = '';

    if (!this.credentials.email || !this.credentials.password) {
      this.formError = 'All fields are required, please try again';
    } else {
      this.doLogin();
    }
  }*/

  private doLogin(): void {
    this.authenticationService.login(this.credentials)
      .then(() => this.router.navigateByUrl('/list-trips'))
      .catch((message) => this.formError = message);
  }

  public isLoggedIn(): boolean {  // Added to address server execution error (BME 2/18/2025)
    return this.authenticationService.isLoggedIn();
  }
}
