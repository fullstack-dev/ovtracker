import {Component} from '@angular/core';
import {UserCycleDataService} from '../../services/user-cycle-data.service';
import {CycleData} from '../../services/cycle-data';

@Component({
  selector: 'app-add-cycles',
  templateUrl: './add-cycles.component.html',
  styleUrls: ['./add-cycles.component.css']
})
export class AddCyclesComponent {

  _date: any;
  item: CycleData | any = {};

  constructor(private userCycleDataService: UserCycleDataService) {
  }


  onSubmit() {
    if (this.item.periodStartDate && this.item.periodEndDate) {
      this.item.cycleId = this.userCycleDataService.createCycleId();
      this.userCycleDataService.addCycle(this.item);
      this.item.periodStartDate = this._date;
      this.item.periodEndDate = this._date;
    }
  }

}
