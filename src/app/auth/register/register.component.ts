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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: UntypedFormGroup;

  constructor(
    private fb: UntypedFormBuilder,
    private notificationService: NzNotificationService,
    private httpRequestService: HttpRequestService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      phoneNumber: [
        null,
        [Validators.pattern('^[0-9]{10}$'), Validators.required],
      ],
      name: [null, [Validators.required]],
    });
  }
  async submitRegisterForm() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value.name)
      const registerData = {
        phone: this.registerForm.value.phoneNumber,
        name: this.registerForm.value.name,
      };
      this.httpRequestService.post('auth/register', registerData).subscribe(
        (res: any) => {
          this.notificationService.success('Success', 'User registered');
          this.router.navigateByUrl('auth')
        },
        (err) => {
          this.notificationService.error('Error', err.message);
        }
      );
    } else {
      this.notificationService.error('Error', 'Invalid Form');
    }
  }
  async goToLoginPage() {
    this.router.navigateByUrl('auth')
  }
}
