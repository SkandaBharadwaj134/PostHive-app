import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module'
import { PostsRoutingModule } from './posts-routing.module';
import { PostsComponent } from './posts.component';
import { AddPostsComponent } from './add-posts/add-posts.component';
import { SinglePostComponent } from './single-post/single-post.component';
import { EditPostComponent } from './edit-post/edit-post.component'
@NgModule({
  declarations: [
    PostsComponent,
    AddPostsComponent,
    SinglePostComponent,
    EditPostComponent
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    SharedModule
  ]
})
export class PostsModule { }
