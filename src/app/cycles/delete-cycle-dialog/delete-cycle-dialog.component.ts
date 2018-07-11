import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {UserCycleDataService} from '../../services/user-cycle-data.service';

@Component({
  selector: 'delete-cycle-dialog',
  templateUrl: './delete-cycle-dialog.component.html',
  styleUrls: ['./delete-cycle-dialog.component.css']
})
export class DeleteCycleDialogComponent {

  constructor(private userCycleDataServie: UserCycleDataService,
              public dialogRef: MatDialogRef<DeleteCycleDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
