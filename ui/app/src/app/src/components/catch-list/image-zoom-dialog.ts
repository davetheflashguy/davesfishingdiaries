import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-image-zoom-dialog',
  templateUrl: './image-zoom-dialog.html',
  styleUrl: './image-zoom-dialog.scss',
  imports: [MatDialogModule, MatButtonModule, MatIconModule, MatToolbarModule]
})
export class ImageZoomDialog {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ImageZoomDialog>
  ) {}
}
