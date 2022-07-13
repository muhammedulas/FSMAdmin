import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/models/User';
import { UsersService } from 'src/app/services/component-services/users.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { ResetPasswordDialogComponent } from './dialogs/resetPasswordDialog/resetPasswordDialog.component';

interface IUsers {
  dataSource: User[];
  displayedColumns: string[];
  selection: SelectionModel<User>;
}
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public users: IUsers = {
    dataSource: [],
    displayedColumns: [],
    selection: new SelectionModel<User>()
  }
  public searchString: string = "";
  public roleList = ["Hepsi", "Yönetici", "Kullanıcı"];
  public selectedRole = "Hepsi";
  constructor(private service: UsersService, private notifier: NotifierService, private dialog: MatDialog) { }

  ngOnInit() {
    this.getUsers();
  }

  private getUsers() {
    let req = this.service.getUsers().subscribe({
      next: res => {
        this.users.dataSource = res;
        console.log(this.users)
      },
      error: err => {
        this.notifier.error_top_center(err);
      },
      complete: () => {
        req.unsubscribe();
      }
    });
  }

  updatePassword(id: number) {
    let dialogRef = this.dialog.open(ResetPasswordDialogComponent, {
      data: { id: id }
    });
  }

}
