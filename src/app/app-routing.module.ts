import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FormsComponent } from './components/forms/forms.component';
import { CardUserComponent } from './components/card-user/card-user.component';


const routes: Routes = [
  { path: 'home', component: DashboardComponent },
  { path: 'forms', component: FormsComponent },
  { path: 'users',        component: UserComponent },
  { path: 'cards',        component: CardUserComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
