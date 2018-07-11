import {Component, OnInit} from '@angular/core';
import {UserCycleDataService} from '../services/user-cycle-data.service';
import {CycleData} from '../services/cycle-data';
import {DeleteCycleDialogComponent} from './delete-cycle-dialog/delete-cycle-dialog.component';
import {MatDialog, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-cycles',
  templateUrl: './cycles.component.html',
  styleUrls: ['./cycles.component.css']
})
export class CyclesComponent implements OnInit {

  items: CycleData[];
  editState: false;
  itemToEdit: CycleData;

  deleteCycleDialogRef: MatDialogRef<DeleteCycleDialogComponent>;

  constructor(private userCycleDataService: UserCycleDataService,
              public dialog: MatDialog) {
  }

  openDeleteCycleDialog() {
    this.deleteCycleDialogRef = this.dialog.open(DeleteCycleDialogComponent, {
      width: '250px',
      height: '250px',
      hasBackdrop: true,
      disableClose: false,
    });
  }

  ngOnInit() {
    this.userCycleDataService.getCycles().subscribe(items => {
      // console.log('SHOW ALL CYCLES', items);
      this.items = items;
    });
  }

  deleteCycle(event, item: CycleData) {
    // console.log('CYCLE DELETED');
    this.clearState();
    this.userCycleDataService.deleteCycle(item);
  }

  editCycle(event, item: CycleData) {
    this.editState = false;
    this.itemToEdit = item;
  }

  updateCycle(item: CycleData) {
    this.userCycleDataService.updateCycle(item);
    this.clearState();
  }

  clearState() {
    this.editState = false;
    this.itemToEdit = null;
  }

}
