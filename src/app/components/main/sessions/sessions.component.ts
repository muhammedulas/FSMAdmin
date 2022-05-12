import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { Session } from 'src/app/models/Session';
import { SessionsService } from 'src/app/services/component-services/sessions.service';
import { NotifierService } from 'src/app/services/notifier.service';

interface ISession {
  dataSource: Session[];
  displayedColumns: string[];
  selection: SelectionModel<Session>;
}

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.scss']
})
export class SessionsComponent implements OnInit {
  public sessions: ISession = {
    dataSource: [],
    displayedColumns: ["RowNr", "Id", "StartedAt", "Time", "UserName", "WorkspaceTitle", "DeviceIdentifier", "Actions"],
    selection: new SelectionModel<Session>()
  };

  public date = Date.now();

  constructor(private service: SessionsService, private notifier: NotifierService) {
    var updateDate = setInterval(() => { this.date = Date.now() }, 1000)
  }

  ngOnInit() {
    this.getSessions();
  }

  getSessions() {
    let req = this.service.getActiveSessions().subscribe({
      next: (res) => {
        this.sessions.dataSource = res;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        req.unsubscribe();
      }
    })
  }

  terminateSession(id: number) {
    let req = this.service.terminateSession(id).subscribe({
      next: (res) => {
        this.notifier.success_top_center(`${id} id'li oturum sonlandırıldı`);
        this.sessions.dataSource = this.sessions.dataSource.filter(q => q.id != id);
      },
      error: (err) => {
        this.notifier.error_top_center(`${id} id'li oturum sonlandırılamadı.`);
      },
      complete: () => {
        req.unsubscribe();
      }
    });
  }



  //CheckBoxControls
  isAllSelected() {
    return this.sessions.selection.selected.length == this.sessions.dataSource.length;
  }

  checkboxLabel(row?: Session): string {
    if (!row) {
      return `${this.isAllSelected() ? 'Tümünün Seçimini Kaldır' : 'Tümünü Seç'}`;
    }
    return `${this.sessions.selection.isSelected(row) ? 'Seçimi Kaldır' : 'Seç'}`;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.sessions.selection.clear();
      return;
    }

    this.sessions.selection.select(...this.sessions.dataSource);
  }

  //General
  getTimeDiff(session: Session) {
    let sDate = new Date(session.startedAt).getTime();
    let milliseconds = this.date - sDate;

    return this.msToTime(milliseconds);
  }

  msToTime(ms: number) {
    let seconds = parseInt(Math.floor((ms / 1000)).toFixed(1));
    let minutes = parseInt((ms / (1000 * 60)).toFixed(1));
    let hours = parseInt((ms / (1000 * 60 * 60)).toFixed(1));
    let days = parseInt(((ms / (1000 * 60 * 60 * 24))).toFixed(1));

    let _days = days;
    let _hours = hours - (days * 24);
    let _minutes = minutes - ((days * 24 * 60) + (hours - (days * 24)) * 60);
    let _seconds = seconds - (_minutes * 60) - (_hours * 60 * 60) - (_days * 60 * 60 * 24);
    let text = ``;
    if (_days > 0) text += `${_days} gün `;
    if (_hours > 0) text += `${_hours} saat `;
    if (_minutes > 0) text += `${_minutes} dakika `;
    if (_seconds < 0) _seconds += (_seconds * (-1))
    text += `${_seconds} saniye`;

    /*     if (seconds < 60) return seconds + " Saniye";
        else if (minutes < 60) return minutes + " Dakika";
        else if (hours < 24) return hours + " Saat";
        else return days + " Gün" */
    return text;
  }

  getUserTooltip(data: Session) {
    return `Adı: ${data.name} 
    Soyadı: ${data.surname} 
    FSM ID'si: ${data.userId}
    LOGO ID'si: ${data.userLogoId}`
  }

  getWorkspaceTooltip(data: Session) {
    return `ID: ${data.worksapceId} 
    Numara: ${data.workspaceNr}
    Firma No: ${data.workspaceFirmNr}
    Dönem No: ${data.workspacePerNr}`
  }

  getDeviceTooltip(data: Session) {
    return `ID: ${data.deviceId} 
    Numara: ${data.deviceNr}
    Açıklama: ${data.deviceDefinition}`
  }

  updateDateTime() {
    this.date = Date.now();
  }

}
