import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  isLogged: boolean = true;
  user: any;

  ngOnInit(): void {
    this.isLogged = localStorage.getItem('token') !== null;
    this.user = JSON.parse(localStorage.getItem('user')!);
  }

}
