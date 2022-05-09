import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { AllowedDevice } from 'src/app/models/AllowedDevice';
import { AuthPendingDevice } from 'src/app/models/AuthPendingDevice';
import { BlockedDevice } from 'src/app/models/BlockedDevice';
import { User } from 'src/app/models/User';
import { DevicesService } from 'src/app/services/component-services/devices.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { firstValueFrom, lastValueFrom } from 'rxjs';



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
  blockAllowedDevices() {
    let failed: { device: AllowedDevice, reason: string }[] = [];
    let success: AllowedDevice[] = [];
    let len = this.allowed.selection.selected.length;

    for (let i = 0; i < len; i++) {
      let device = this.allowed.selection.selected[i];

      let req = this.service.block(device.id, "allowed").subscribe({
        next: res => {
          success.push(device);
        },
        error: (err) => {
          failed.push({ device: device, reason: err.error.description });
        },
        complete: () => {
          req.unsubscribe();
          success.forEach(dev => this.allowed.selection.deselect(dev));
          this.allowed.dataSource = this.allowed.dataSource.filter(q => !success.includes(q));
        }
      })
    }
    if (failed.length == 0) {
      this.notifier.success_top_center("Seçili Cihazlar Engellendi");
    }
    else {
      this.notifier.show_top_center(`Seçilen ${len} adet cihazdan ${success.length} tanesi engellendi.`);
      let message = "";
      failed.forEach(q => message += `${q.device.id},`)
      message += "id'li cihazlar engellenemedi"
      this.notifier.error_top_center(message)
    }
  }


  blockPendingDevices() {

  }

  unblock() {

  }

  allowPendingDevices() {

  }

  async allowBlockedDevices() {
    let failed: { device: BlockedDevice, reason: string }[] = [];
    let success: BlockedDevice[] = [];
    let len = this.blocked.selection.selected.length;

    for (let i = 0; i < this.blocked.selection.selected.length; i++) {
      let device = this.blocked.selection.selected[i];
      let result = false;
      console.log(`Request ${i + 1} sent`)
      let req = await firstValueFrom(this.service.allow(device.id, "blocked")).then(res => {
        success.push(device);
      }).catch(err => {
        failed.push({ device: device, reason: err.error.description });
      }).finally(() => {
        console.log(`Request ${i + 1} completed`);
        this.blocked.dataSource = this.blocked.dataSource.filter(dev => !success.includes(dev));
      })
    }
    this.blocked.selection.selected.forEach(dev => {
      this.blocked.selection.deselect(dev);
    })



    //Observable Subscription
    /* .subscribe({
      next: _res => {
        success.push(device);
      },
      error: (err) => {
        failed.push({ device: device, reason: err.error.description });
      },
      complete: () => {
        req.unsubscribe();
        this.blocked.dataSource = this.blocked.dataSource.filter(q => !success.includes(q));
        success.forEach(dev => this.blocked.selection.deselect(dev));
      }
    }) */

    //Promise Version
    /*     .then(res => {
          success.push(device);
        }).catch(err => {
          failed.push({ device: device, reason: err.error.description });
        }).finally(() => {
          this.blocked.dataSource = this.blocked.dataSource.filter(q => !success.includes(q));
          success.forEach(dev => this.blocked.selection.deselect(dev));
          console.log(`Request ${i} completed`)
        })
    
        setTimeout(() => {
          if (result == false) {
            console.log("waiting for result")
          }
        }, 1) */

    //Notify
    if (failed.length == 0) {
      this.notifier.success_top_center("Seçili Cihazlara Giriş İzni Verildi");
    }
    else {
      this.notifier.show_top_center(`Seçilen ${len} adet cihazdan ${success.length} tanesine giriş izni verildi.`);
      let message = "";
      failed.forEach(q => message += `${q.device.id},`)
      message += "id'li cihazlar engellenemedi"
      this.notifier.error_top_center(message)
    }

  }

  deny() {

  }

  async disallow() {
    let failed: { device: AllowedDevice, reason: string }[] = [];
    let success: AllowedDevice[] = [];
    let len = this.allowed.selection.selected.length;

    for (let i = 0; i < this.allowed.selection.selected.length; i++) {
      let device = this.allowed.selection.selected[i];
      let result = false;
      console.log(`Request ${i + 1} sent`)
      let req = await firstValueFrom(this.service.disallow(device.id)).then(res => {
        success.push(device);
        console.log(res);
      }).catch(err => {
        failed.push({ device: device, reason: err.error.description });
        console.log(err);
      }).finally(() => {
        console.log(`Request ${i + 1} completed`);
        this.allowed.dataSource = this.allowed.dataSource.filter(dev => !success.includes(dev));
      })
    }
    this.allowed.selection.selected.forEach(dev => {
      this.allowed.selection.deselect(dev);
    })

    //Notify
    if (failed.length == 0) {
      this.notifier.success_top_center("Seçili Cihazların Giriş İzni Kaldırıldı");
    }
    else {
      this.notifier.show_top_center(`Seçilen ${len} adet cihazdan ${success.length} tanesinin giriş izni kaldırıldı.`);
      let message = "";
      failed.forEach(q => message += `${q.device.id},`)
      message += "id'li cihazlar engellenemedi"
      this.notifier.error_top_center(message)
    }
  }
}




