import { Component, OnInit, Input, Injectable } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { HttpRequestService } from 'src/app/httpRequest/http-request.service';
import { Router } from '@angular/router';
import { ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit{
  
  editPost!: UntypedFormGroup;
  postId = '';
  constructor(
    private fb: UntypedFormBuilder,
    private notificationService: NzNotificationService,
    private httpRequestService: HttpRequestService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}
  ngOnInit(): void {
    if (!this.postId) {
      this.postId = this.activatedRoute.snapshot.params['id'];
    }
    this.editPost = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      markdown: ['']
    });
    this.getPost();
  }
  getPost() {
    this.httpRequestService.get(`articles/${this.postId}`).subscribe(
      (res: any) => {
        this.editPost.patchValue({
          title: res.title,
          description: res.description,
          markdown: res.markdown
        })
      },
      (err) => {
      }
    );
  }
  submitForm () {
    if (this.editPost.valid) {
      const postData = {
        title: this.editPost.value.title,
        description: this.editPost.value.description,
        markdown: this.editPost.value.markdown,
        createdAt: new Date()
      };
      this.httpRequestService.put(`articles/${this.postId}`, postData).subscribe(
        (res: any) => {
          this.notificationService.success('Success', `Post Successfully Edited`);
          this.router.navigateByUrl(`posts/${this.postId}`);
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
