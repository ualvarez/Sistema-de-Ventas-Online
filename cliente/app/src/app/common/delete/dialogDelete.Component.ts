import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    templateUrl: 'dialogDelete.Component.html'
})

export class DialogDeleteComponent {
    constructor(public dialogRef: MatDialogRef<DialogDeleteComponent>) {

    }
}