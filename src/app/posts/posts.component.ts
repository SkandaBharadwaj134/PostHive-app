import { Component, OnInit } from '@angular/core';
import { HttpRequestService } from 'src/app/httpRequest/http-request.service';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  posts: any [] = [];
  searchItem: string = '';
  postSearchSubject: Subject<any> = new Subject<any>();
  page = 1;
  limit = 2;
  totalPostCount = 0;
  constructor(
    private httpRequestService: HttpRequestService,
    private router: Router,
    private notificationService: NzNotificationService
  ) {}
  ngOnInit(): void {
    this.postSearchSubject.pipe(debounceTime(700)).subscribe((success) => {
      this.searchItem = success;
      this.getAllPosts();
    });
    this.getAllPosts();
  }
  searchPost(searchItem: string) {
    this.postSearchSubject.next(searchItem);
  }
  getAllPosts() {
    try {
      let params: any = {
        page: this.page,
        limit: this.limit,
      };
      if (this.searchItem) {
        params['search'] = this.searchItem;
      }
    this.httpRequestService.get('articles', params).subscribe(
      (res: any) => {
        this.posts = res.data;
        this.totalPostCount = res.total;
      },
      (err) => {
      }
    );
  } catch (error) {
    console.error(error)
  }
  }
  editPost(id:any) {
    this.router.navigateByUrl(`posts/edit/${id}`)
  }
  deletePost(id:any,idx:any) {
    console.log(id,idx)
    this.posts.splice(idx, 1)
    this.httpRequestService.delete(`articles/${id}`).subscribe(
      (res: any) => {
      },
      (err) => {
        
      })
      this.notificationService.success('Success', `Post Deleted Successfully`);
    
  }
  onQueryParamsChange(params: any): void {
    this.page = params || 1;
    this.getAllPosts();
  }
}
