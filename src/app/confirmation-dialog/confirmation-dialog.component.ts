import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [],
  template: `
    <h2>{{ data.title }}</h2>
    <p>{{ data.message }}</p>
    <button mat-raised-button color="primary" (click)="onConfirm()">Onayla</button>
    <button mat-raised-button color="warn" (click)="onCancel()">İptal</button>
  `,
  styles: ''
})
export class ConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
