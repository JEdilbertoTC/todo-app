import {Component} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  isLogged: boolean = true;
  showErrors: boolean = false;
  user: any;


  constructor(private authService: AuthService, private router: Router) {
    this.isLogged = localStorage.getItem('token') !== null;
    this.user = JSON.parse(localStorage.getItem('user')!);
  }

  register() {
    const user = {
      name: this.name,
      email: this.email,
      password: this.password
    };

    if (user.name && user.email && user.password)

      this.authService.register(user).subscribe(({token}) => {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        this.router.navigate(['/tasks']).then();
      }, () => {
        this.showErrors = true;
      });
  }
}
