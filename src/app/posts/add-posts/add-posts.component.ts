import { Component, OnInit, Input, Injectable } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { HttpRequestService } from 'src/app/httpRequest/http-request.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-posts',
  templateUrl: './add-posts.component.html',
  styleUrls: ['./add-posts.component.css']
})
export class AddPostsComponent implements OnInit{
  @Input() editId:any;
  @Input() isFromEdit:any;
  addNewPost!: UntypedFormGroup;
  constructor(
    private fb: UntypedFormBuilder,
    private notificationService: NzNotificationService,
    private httpRequestService: HttpRequestService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.addNewPost = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      markdown: ['']
    });
  }
  submitForm () {
    if (this.addNewPost.valid) {
      const postData = {
        title: this.addNewPost.value.title,
        description: this.addNewPost.value.description,
        markdown: this.addNewPost.value.markdown,
        createdAt: new Date()
      };
      this.httpRequestService.post('articles', postData).subscribe(
        (res: any) => {
          this.notificationService.success('Success', `New Post Added`);
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
}
