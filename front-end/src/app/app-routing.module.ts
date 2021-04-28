import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HotelListComponent } from './hotel-list/hotel-list.component'
import { BookingListComponent } from './booking-list/booking-list.component';
import { BookHotelComponent } from './book-hotel/book-hotel.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './authorization/auth.guard'

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'hotels', component: HotelListComponent, canActivate: [AuthGuard]},
  {path: 'bookings', component: BookingListComponent, canActivate: [AuthGuard]},
  {path: 'book-hotel', component: BookHotelComponent, canActivate: [AuthGuard]},
  {path: 'home', component: HomeComponent,  canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
