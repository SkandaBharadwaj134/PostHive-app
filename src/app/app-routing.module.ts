import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { PostsComponent } from './posts/posts.component';
import { RegisterComponent} from './auth/register/register.component'
import { AddPostsComponent } from '../app/posts/add-posts/add-posts.component'
import { SinglePostComponent } from '../app/posts/single-post/single-post.component'
import { EditPostComponent } from '../app/posts/edit-post/edit-post.component'
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/auth' },
  {
    path: 'auth',
    component: AuthComponent,
    loadChildren: () =>
      import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'auth/register',
    component: RegisterComponent,
    loadChildren: () =>
      import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'posts',
    component: PostsComponent,
    loadChildren: () =>
      import('./posts/posts.module').then((m) => m.PostsModule),
  },
  {
    path: 'posts/new',
    component: AddPostsComponent,
    loadChildren: () =>
      import('./posts/posts.module').then((m) => m.PostsModule),
  },
  {
    path: 'posts/:id',
    component: SinglePostComponent,
    loadChildren: () =>
      import('./posts/posts.module').then((m) => m.PostsModule),
  },
  {
    path: 'posts/edit/:id',
    component: EditPostComponent,
    loadChildren: () =>
      import('./posts/posts.module').then((m) => m.PostsModule),
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
