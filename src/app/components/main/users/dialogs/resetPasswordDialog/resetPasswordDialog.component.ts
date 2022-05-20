import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmPasswordValidator } from './confirmPasswordValidator';


@Injectable()
@Component({
  selector: 'app-resetPasswordDialog',
  templateUrl: './resetPasswordDialog.component.html',
  styleUrls: ['./resetPasswordDialog.component.scss']
})
export class ResetPasswordDialogComponent implements OnInit {
  public resetForm: FormGroup = new FormGroup({});


  constructor(@Inject(MAT_DIALOG_DATA) public id: number, private fb: FormBuilder) { }

  ngOnInit() {
    this.initializeForm();
  }
  initializeForm() {
    this.resetForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6), ConfirmPasswordValidator]]
    }, {
      validators: ConfirmPasswordValidator("password", "confirmPassword")
    });
  }


  submit(form: FormGroup) {
    console.log("test");
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
