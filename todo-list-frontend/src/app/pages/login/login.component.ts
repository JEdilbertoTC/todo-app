import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  isLogged: boolean = true;
  user: any;
  showErrors: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.isLogged = localStorage.getItem('token') !== null;
    this.user = JSON.parse(localStorage.getItem('user')!);
  }

  login() {
    this.authService.login(this.email, this.password).subscribe(({token}) => {
      localStorage.setItem('token', token);
      this.authService.user().subscribe(user => {
        localStorage.setItem('user', JSON.stringify(user));
        this.isLogged = true;
        this.router.navigate(['/tasks']).then();
      });

    }, () => {
      this.showErrors = true;
    });
  }
}
