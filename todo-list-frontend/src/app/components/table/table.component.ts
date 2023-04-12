import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {TasksService} from "../../services/tasks.service";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import Swal from 'sweetalert2';
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {ModalComponent} from "../modal/modal.component";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @ViewChild(MatTable) table!: MatTable<any>;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;

  columns: string[] = ['id', 'title', 'description', 'created_at', 'updated_at', 'actions'];

  tasks: any = [];
  dataSource: any;
  filters: any = {};
  selected: number = 1;
  q: string = '';

  constructor(public tasksService: TasksService,
              private snackBar: MatSnackBar,
              public dialogRef: MatDialog) {
  }

  ngOnInit(): void {
    this.filters.completed = 1;
    this.filters.page = 1;
    this.getTasks();
  }

  getTasks() {
    this.tasksService.getTasks(this.filters).subscribe((t) => {
      this.tasks = t;
      const {data: tasks} = this.tasks;

      this.dataSource = new MatTableDataSource<any>(tasks);
      this.dataSource.sort = this.sort;
    });
  }

  changeTasksStatus(status: number) {
    this.filters.completed = status;
    this.filters.page = 1;
    this.selected = status;

    this.getTasks();
  }

  delete(id: string) {
    Swal.fire({
      title: 'Error',
      text: '¿Estàs seguro de borrar esta tareas?',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then(value => {
      if (value.isConfirmed) {
        this.tasksService.delete(id).subscribe(() => {
          this.getTasks();
          this.snackBar.open('Borrado correctamente');
        });
      }
    });
  }

  markCompleted(id: string) {
    this.tasksService.markCompleted(id).subscribe(() => {
      this.getTasks();
      this.snackBar.open('Tarea completada');
    });
  }

  openModal(title: string = '', description: string = '', id: string = '') {
    this.dialogRef.open(ModalComponent, {
      width: '600px',
      data: {title, description, id}
    }).afterClosed().subscribe(() => {
      this.getTasks();
    })
  }

  search() {
    const tasks = this.tasks.filter((task: any) => {
      if (task.description.includes(this.q) || task.title.includes(this.q)) {
        return task;
      }

    })
    this.dataSource = new MatTableDataSource<any>(tasks);
    this.dataSource.sort = this.sort;
  }

  getFirstPage() {
    this.filters.page = 1;
    this.getTasks();
  }

  getLastPage() {
    this.filters.page = Math.round(this.tasks.total / this.tasks.per_page);
    this.getTasks();
  }

  getPreviousPage() {
    this.filters.page--;
    this.getTasks();
  }

  getNextPage() {
    this.filters.page++;
    this.getTasks();
  }

  deleteAll() {
    Swal.fire({
      title: 'Error',
      text: '¿Estàs seguro de deseas borrar todas las tareas?',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then(value => {
      if (value.isConfirmed) {
        this.tasks.data.forEach(({id}: any) => {
          this.tasksService.delete(id).subscribe(() => {
            this.getTasks();
            this.snackBar.open('Borrado correctamente');
          });
        })

      }
    });
  }
}
