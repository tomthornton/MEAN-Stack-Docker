import { Component, OnInit, ViewChild, Inject} from '@angular/core';
import { Subscription } from 'rxjs';
import { MatSort, MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';

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
  title = 'passwords';
  data: Password[] = [];
  private passSub: Subscription;

  passwords = new MatTableDataSource(this.data);
  displayedColumns: string[] = ['id', 'website', 'description', 'URL', 'username', 'password'];

  constructor(public passwordsService: PasswordsService, private dialog: MatDialog, private alert: MatSnackBar) { }

  @ViewChild(MatSort) sort: MatSort;

  newPassword() {
    const dialogRef = this.dialog.open(PasswordDialogComponent, {
      data : {
        title: 'New Password',
        buttons: [
          {text: 'Add Password', icon: 'add', function: 'addPassword()', color: 'blue'}
        ]
      },
      height: '320px',
      width: '740px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if ( result ) {
        this.addPassword(result);
      }
    });
  }

  addPassword(dialogData) {
    this.passwordsService.addPassword(dialogData.website, dialogData.description, dialogData.URL, dialogData.username, dialogData.password);
    this.alert.open('Password Added Successfully', '', {duration: 1500, panelClass: ['snack-alert']});
  }

  editPassword(password) {
    const dialogRef = this.dialog.open(PasswordDialogComponent, {
      data : {
        title: 'Edit Password',
        buttons: [
          {text: 'Delete Password', icon: 'delete' , function: 'deletePassword()', color: 'gray'},
          {text: 'Save Password', icon: 'done', function: 'addPassword()', color: 'blue'}
        ],
        id: password.id,
        website: password.website,
        description: password.description,
        URL: password.URL,
        username: password.username,
        password: password.password
      },
      height: '320px',
      width: '740px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.function === 'delete') {
        this.passwordsService.deletePassword(result.id);
        this.alert.open('Password Deleted', '', {duration: 1500, panelClass: ['snack-alert']});
      } else {
            this.passwordsService.updatePassword(
              result.id,
              result.website,
              result.description,
              result.URL,
              result.username,
              result.password);
      }


      });
  }

  copyThis(text) {

    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

    this.alert.open("' " + text + " ' copied to clipboard", '', {duration: 1500, panelClass: ['snack-alert']});
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
