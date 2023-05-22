import { Component, OnInit } from '@angular/core';
import { HttpRequestService } from 'src/app/httpRequest/http-request.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit{
  post: any = {}
  postId = ''
  markdownEx = ''
  constructor(
    private httpRequestService: HttpRequestService,
    private activatedRoute: ActivatedRoute,
  ) {}
  ngOnInit(): void {
    if (!this.postId) {
      this.postId = this.activatedRoute.snapshot.params['id'];
    }
    console.log(this.postId)
    this.getPost()
    this.markdownEx = `<strong> hello </strong>`
  }
  getPost() {
    this.httpRequestService.get(`articles/${this.postId}`).subscribe(
      (res: any) => {
        this.post = res
        console.log(this.post)
      },
      (err) => {
      }
    );
  }
}
