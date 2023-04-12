import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() user: any;
  @Output() isLogged = new EventEmitter<boolean>();

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout().subscribe(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.isLogged.emit(false);
      this.router.navigate(['/login']).then();
    });
  }


}
