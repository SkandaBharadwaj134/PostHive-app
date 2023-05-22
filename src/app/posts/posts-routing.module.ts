import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './posts.component'
import { SharedModule } from '../shared/shared.module'

const routes: Routes = [
  {
    path: '',
    component: PostsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),
    SharedModule
  ],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
