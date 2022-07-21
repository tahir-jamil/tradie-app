import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobDetailComponent } from './job-detail/job-detail.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  { path: 'add', component: JobDetailComponent },
  { path: 'job/:id', component: JobDetailComponent },
  { path: '', component: ListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
