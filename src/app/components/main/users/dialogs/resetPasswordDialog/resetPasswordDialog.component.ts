import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersService } from 'src/app/services/component-services/users.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { ConfirmPasswordValidator } from './confirmPasswordValidator';

interface IResetPasswordForm {
  NewPassword: string;
  ConfirmNewPassword: string;
}


@Injectable()
@Component({
  selector: 'app-resetPasswordDialog',
  templateUrl: './resetPasswordDialog.component.html',
  styleUrls: ['./resetPasswordDialog.component.scss']
})
export class ResetPasswordDialogComponent implements OnInit {
  public resetForm: FormGroup = new FormGroup({});


  constructor(@Inject(MAT_DIALOG_DATA) public id: number, private fb: FormBuilder, private service: UsersService, private notifier: NotifierService, private dialogRef: MatDialogRef<ResetPasswordDialogComponent>) { }

  ngOnInit() {
    this.initializeForm();
    console.log(this.id)
  }
  initializeForm() {
    this.resetForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6), ConfirmPasswordValidator]]
    }, {
      validators: ConfirmPasswordValidator("password", "confirmPassword")
    });
  }


  submit() {
    let formValue: IResetPasswordForm = {
      NewPassword: this.resetForm.controls["password"].value,
      ConfirmNewPassword: this.resetForm.controls["confirmPassword"].value
    };
    let req = this.service.resetPassword(2, formValue).subscribe({
      next: (res) => {
        if (res == null) {
          this.notifier.success_top_center("Kullanıcının parolası güncellendi");
          this.dialogRef.close();
        }
        else {
          this.notifier.warning_top_center(JSON.stringify(res));
        }
      },
      error: (err) => { this.notifier.error_top_center(JSON.stringify(err.description)); },
      complete: () => { req.unsubscribe() }
    });
  }

  matchError() {
    if (this.resetForm.controls['confirmPassword'].errors == null) return false
    if (this.resetForm.controls['confirmPassword'].value.length >= 6) {
      if (this.resetForm.controls['confirmPassword'].errors!['matchError'] == null) return false
      if (this.resetForm.controls['confirmPassword'].errors!['matchError'] == true) return true
      return false
    }
    return false
  }
}
