import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatTableModule,
         MatSortModule,
         MatCardModule,
         MatButtonModule,
         MatIconModule,
         MatDialogModule,
         MatDialog,
         MatInputModule
         } from '@angular/material';


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PasswordDialogComponent } from './passworddialog/passworddialog.component';

@NgModule({
  declarations: [
    AppComponent,
    PasswordDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule
  ],
  entryComponents: [PasswordDialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
