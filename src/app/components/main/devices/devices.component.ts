import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { AllowedDevice } from 'src/app/models/AllowedDevice';
import { AuthPendingDevice } from 'src/app/models/AuthPendingDevice';
import { BlockedDevice } from 'src/app/models/BlockedDevice';
import { User } from 'src/app/models/User';
import { DevicesService } from 'src/app/services/component-services/devices.service';
import { NotifierService } from 'src/app/services/notifier.service';


interface IAllowed {
  dataSource: AllowedDevice[];
  displayedColumns: string[];
  selection: SelectionModel<AllowedDevice>;
}

interface IPending {
  dataSource: AuthPendingDevice[];
  displayedColumns: string[];
  selection: SelectionModel<AuthPendingDevice>;
}

interface IBlocked {
  dataSource: BlockedDevice[];
  displayedColumns: string[];
  selection: SelectionModel<BlockedDevice>;
}

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {


  public allowed: IAllowed = {
    dataSource: [],
    displayedColumns: ["Select", "ID", "Number", "Definition", "DeviceID", "AllowedBy"],
    selection: new SelectionModel<AllowedDevice>(true, [])
  }

  public pending: IPending = {
    dataSource: [],
    displayedColumns: ["Select", "ID", "RequestDate", "Message", "DeviceID", "RequestedBy"],
    selection: new SelectionModel<AuthPendingDevice>(true, [])
  }

  public blocked: IBlocked = {
    dataSource: [],
    displayedColumns: ["Select", "ID", "Definition", "DeviceID", "BlockedBy"],
    selection: new SelectionModel<BlockedDevice>(true, [])
  }

  constructor(private service: DevicesService, private notifier: NotifierService) { }

  ngOnInit() {
    this.getAllowedDevices();
    this.getPendingDevices();
    this.getBlockedDevices();
  }




  //Allowed Devices
  getAllowedDevices() {
    var req = this.service.getAllowedDevices(true).subscribe({
      next: res => {
        this.allowed.dataSource = res;
        console.log(res);
      },
      error: err => {
        console.log(err);
        this.notifier.error_top_center(err.error.description)
      },
      complete: () => {
        req.unsubscribe();
      }
    })
  }

  isAllSelectedOfAllowed() {
    return this.allowed.selection.selected.length == this.allowed.dataSource.length;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggleAllowed() {
    if (this.isAllSelectedOfAllowed()) {
      this.allowed.selection.clear();
      return;
    }

    this.allowed.selection.select(...this.allowed.dataSource);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabelAllowed(row?: AllowedDevice): string {
    if (!row) {
      return `${this.isAllSelectedOfAllowed() ? 'Tümünün Seçimini Kaldır' : 'Tümünü Seç'}`;
    }
    return `${this.allowed.selection.isSelected(row) ? 'Seçimi Kaldır' : 'Seç'}`;
  }






  //Pending Devices
  getPendingDevices() {
    var req = this.service.getPendingDevices(true).subscribe({
      next: res => {
        this.pending.dataSource = res;
        console.log(res);
      },
      error: err => {
        console.log(err);
        this.notifier.error_top_center(err.error.description)
      },
      complete: () => {
        req.unsubscribe();
      }
    })
  }



  isAllSelectedOfPending() {
    return this.pending.selection.selected.length == this.pending.dataSource.length;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterTogglePending() {
    if (this.isAllSelectedOfPending()) {
      this.pending.selection.clear();
      return;
    }

    this.pending.selection.select(...this.pending.dataSource);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabelPending(row?: AuthPendingDevice): string {
    if (!row) {
      return `${this.isAllSelectedOfPending() ? 'Tümünün Seçimini Kaldır' : 'Tümünü Seç'}`;
    }
    return `${this.pending.selection.isSelected(row) ? 'Seçimi Kaldır' : 'Seç'}`;
  }




  //Blocked Devices
  getBlockedDevices() {
    var req = this.service.getBlockedDevices(true).subscribe({
      next: res => {
        this.blocked.dataSource = res;
        console.log(res);
      },
      error: err => {
        console.log(err);
        this.notifier.error_top_center(err.error.description)
      },
      complete: () => {
        req.unsubscribe();
      }
    })
  }



  isAllSelectedOfBlocked() {
    return this.blocked.selection.selected.length == this.blocked.dataSource.length;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggleBlocked() {
    if (this.isAllSelectedOfBlocked()) {
      this.blocked.selection.clear();
      return;
    }

    this.blocked.selection.select(...this.blocked.dataSource);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabelBlocked(row?: BlockedDevice): string {
    if (!row) {
      return `${this.isAllSelectedOfBlocked() ? 'Tümünün Seçimini Kaldır' : 'Tümünü Seç'}`;
    }
    return `${this.blocked.selection.isSelected(row) ? 'Seçimi Kaldır' : 'Seç'}`;
  }





  //General
  getUserTooltip(user: User) {
    return `Adı: ${user.name} 
    Soyadı: ${user.surName} 
    FSM ID'si: ${user.id}
    LOGO ID'si: ${user.LogoUserID}`
  }


  onTabChange(event: any) {
    if (event.index == 0 && this.allowed.selection.selected.length < 1) { this.getAllowedDevices() }

    if (event.index == 1 && this.pending.selection.selected.length < 1) { this.getPendingDevices() }

    if (event.index == 2 && this.blocked.selection.selected.length < 1) { this.getBlockedDevices() }
  }



  //Actions
  allow(source: string) {
    if (source == "pending") {
      for (let i = 0; i < this.pending.selection.selected.length; i++) {
        let id = this.pending.selection.selected[i].id;

        var req = this.service.allow(id, "authPending").subscribe({
          next: () => {
            if (i == this.pending.selection.selected.length - 1) {
              this.notifier.success_top_center("Seçili cihazlara giriş izni verildi");
            }
          },
          error: err => {
            this.notifier.error_top_center(err.error.description, 3, `${id} ID'li cihaza giriş izni verilemedi`);
            console.log(err);
          },
          complete: () => {
            req.unsubscribe();
          }
        })
      }
      this.getPendingDevices();
      return
    }

    if (source == "blocked") {
      for (let i = 0; i < this.blocked.selection.selected.length; i++) {
        let id = this.blocked.selection.selected[i].id;

        var req = this.service.allow(id, "blocked").subscribe({
          next: () => {
            if (i == this.blocked.selection.selected.length - 1) {
              this.notifier.success_top_center("Seçili cihazlara giriş izni verildi");
            }
          },
          error: err => {
            this.notifier.error_top_center(err.error.description, 3, `${id} ID'li cihaza giriş izni verilemedi`);
            console.log(err);
          },
          complete: () => {
            req.unsubscribe();
          }
        })
      }
      this.getBlockedDevices();
    }

  }


  block(source: string) {
    if (source == "allowed") {
      let blocked: AllowedDevice[] = [];
      for (let i = 0; i < this.allowed.selection.selected.length; i++) {
        let device = this.allowed.selection.selected[i];

        var req = this.service.block(device.id, "allowed").subscribe({
          next: () => {
            if (i == this.allowed.selection.selected.length - 1) {
              this.notifier.success_bot_center("Seçili cihazlar engellendi");
              blocked.push(device);
            }
          },
          error: err => {
            this.notifier.error_top_center(err.error.description, 3, `${device.id} ID'li cihaz engellenemedi`)
          },
          complete: () => {
            req.unsubscribe();
          }
        })
      }
      this.allowed.dataSource = this.allowed.dataSource.filter(q => !blocked.includes(q))
      return
    }

    if (source == "pending") {
      let blocked: AuthPendingDevice[] = [];
      for (let i = 0; i < this.pending.selection.selected.length; i++) {
        let device = this.pending.selection.selected[i];

        var req = this.service.block(device.id, "authPending").subscribe({
          next: () => {
            if (i == this.pending.selection.selected.length - 1) {
              this.notifier.success_bot_center("Seçili cihazlar engellendi");
              blocked.push(device);
            }
          },
          error: err => {
            this.notifier.error_top_center(err.error.description, 3, `${device.id} ID'li cihaz engellenemedi`)
          },
          complete: () => {
            req.unsubscribe();
          }
        })
      }
      this.pending.dataSource = this.pending.dataSource.filter(q => !blocked.includes(q))
      return
    }
  }

  test() {
    let blocked: AllowedDevice[] = [];

    for (let i = 0; i < this.allowed.selection.selected.length; i++) {
      let device = this.allowed.selection.selected[i];
      blocked.push(device);
    }
    this.allowed.selection.clear();
    this.allowed.dataSource = this.allowed.dataSource.filter(q => !blocked.includes(q));

  }

}




