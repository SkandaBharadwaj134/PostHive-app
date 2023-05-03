import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { HttpRequestService } from 'src/app/httpRequest/http-request.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  loginForm!: UntypedFormGroup;
  phone: any;
  constructor(
    private fb: UntypedFormBuilder,
    private notificationService: NzNotificationService,
    private httpRequestService: HttpRequestService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      phoneNumber: [
        null,
        [Validators.pattern('^[0-9]{10}$'), Validators.required],
      ],
      otp: [null, [Validators.pattern('^[0-9]{4}$'),Validators.required]],
    });
  }
  async submitLoginForm() {
    if (this.loginForm.valid) {
      const loginData = {
        phone: this.loginForm.value.phoneNumber,
        otp: this.loginForm.value.otp
      };
      this.httpRequestService.post('auth/otp-verify', loginData).subscribe(
        (res: any) => {
          this.notificationService.success('Success', `Logged in as ${res.user.name}`);
          localStorage.setItem('auth-token', res.token)
          this.router.navigateByUrl(`posts`);
        },
        (err) => {
          this.notificationService.error('Error', err.message);
        }
      );
    } else {
      this.notificationService.error('Error', 'Invalid Form');
    }
  }
  async sendOtp(phoneNumber: any) {
    this.httpRequestService.post('auth/otp-login', {phone: phoneNumber}).subscribe(
      (res: any) => {
        this.notificationService.success('Success', 'OTP Sent');
      },
      (err) => {
        this.notificationService.error('Error', err.message);
      }
    );
  }
  async goToRegisterPage() {
    this.router.navigateByUrl('auth/register')
  }

  
}
