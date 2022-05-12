import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/component-services/users.service';
import { NotifierService } from 'src/app/services/notifier.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private service: UsersService, private notifier: NotifierService) { }

  ngOnInit() {
  }

}
