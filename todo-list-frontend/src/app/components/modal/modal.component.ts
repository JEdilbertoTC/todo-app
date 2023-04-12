import {Component, Inject} from '@angular/core';
import {TasksService} from "../../services/tasks.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  description: string = '';
  title: string = '';
  id: string = '';
  task: any = {};

  constructor(private tasksService: TasksService,
              private snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<ModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data.title;
    this.description = data.description;
    this.id = data.id;
  }

  save() {
    this.task['title'] = this.title;
    this.task['description'] = this.description;
    this.task['id'] = this.id;

    if (this.id) {
      this.tasksService.update(this.task).subscribe(() => {
        this.snackBar.open('Editado correctamente');
        this.dialogRef.close();
      });
    } else {
      this.tasksService.save(this.task).subscribe((a) => {
        if (!a.errors) {
          this.snackBar.open('Guardado correctamente');
          this.dialogRef.close();
        }
      });
    }
  }
}
