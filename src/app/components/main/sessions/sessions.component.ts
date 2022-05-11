import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { Session } from 'inspector';
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
    displayedColumns: [],
    selection: new SelectionModel<Session>()
  }
  constructor(private service: SessionsService, private notifier: NotifierService) { }

  ngOnInit() {
  }

}
