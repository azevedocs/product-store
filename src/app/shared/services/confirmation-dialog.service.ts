import { Component, inject, Injectable } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { filter, Observable } from 'rxjs';

@Component({
  selector: 'app-confirmation-dialog',
  template: `
  <h2 mat-dialog-title>Deletar produto</h2>
<mat-dialog-content>
  Tem certeza que deseja deletar esse produto?
</mat-dialog-content>
<mat-dialog-actions align="center">
  <button mat-button (click)="onNo()">Não</button>
  <button mat-flat-button color="warn" (click)="onYes()" cdkFocusInitial>Sim</button>
</mat-dialog-actions> 
`,
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
})
export class ConfirmationDialogComponent {
   matdDialog = inject(MatDialogRef);

   onNo() {
    this.matdDialog.close(false);
   }
   onYes() {
    this.matdDialog.close(true);
   }
}

@Injectable({
  providedIn: 'root'
})
export class ConfirmationDialogService {
  matDialog = inject(MatDialog);

  constructor() { }

  openDialog(): Observable<boolean> {
    return this.matDialog.open(ConfirmationDialogComponent)
    .afterClosed()
  }
}
