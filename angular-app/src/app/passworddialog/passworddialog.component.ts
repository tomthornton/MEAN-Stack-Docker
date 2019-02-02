import { Component, OnInit, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';


@Component({
  selector: 'app-passworddialog',
  templateUrl: './passworddialog.component.html',
  styleUrls: ['./passworddialog.component.scss']
})
export class PasswordDialogComponent implements OnInit {

  public message;

  constructor(
    public dialogRef: MatDialogRef<PasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  buttonRouter(name) {
    if (name === 'add') {
      if (this.data.website && this.data.description && this.data.username && this.data.password) {
        this.data.function = name;
        this.dialogRef.close(this.data);
      } else {
        this.message = 'All required fields must be completed';
      }
    } else if (name === 'delete') {
      this.data.function = name;
      this.dialogRef.close(this.data);

    } else {
      this.data.function = name;
      if (this.data.website && this.data.description && this.data.username && this.data.password) {
        this.data.function = name;
        this.dialogRef.close(this.data);
      } else {
        this.message = 'All required fields must be completed';
      }
    }
  }
}
