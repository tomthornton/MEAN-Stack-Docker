import { Component, OnInit, ViewChild, Inject} from '@angular/core';
import { Subscription } from 'rxjs';
import { MatSort, MatTableDataSource } from '@angular/material';
import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { Password } from './password.model';
import { PasswordsService } from '../app/passwords.service';
import { PasswordDialogComponent } from './passworddialog/passworddialog.component';

export interface Password {
  website: string;
  description: string;
  URL: string;
  username: string;
  password: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Passwords';
  data: Password[] = [];
  private passSub: Subscription;

  passwords = new MatTableDataSource(this.data);
  displayedColumns: string[] = ['website', 'description', 'URL', 'username', 'password'];

  constructor(public passwordsService: PasswordsService, private dialog: MatDialog) { }

  @ViewChild(MatSort) sort: MatSort;

  newPassword() {
    const dialogRef = this.dialog.open(PasswordDialogComponent, {
      data : {
        title: 'New Password',
        buttons: [
          {text: 'Add Password', function: 'addPassword()', color: 'blue'}
        ]
      },
      height: '400px',
      width: '700px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.addPassword(result);
    });
  }

  addPassword(dialogData) {
    this.passwordsService.addPassword(dialogData.website, dialogData.description, dialogData.URL, dialogData.username, dialogData.password);
  }


  ngOnInit() {
    this.passwords.sort = this.sort;
      this.passwordsService.getPasswords();
      this.passSub = this.passwordsService.getPostUpdateListener()
        .subscribe((passwords: Password[]) => {
          this.passwords = new MatTableDataSource(passwords);
        });
  }
}
