import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FormsComponent } from './forms/forms.component';
import { HomeComponent } from './home/home.component';
import { LeftPanelComponent } from './left-panel/left-panel.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { EditFormComponent } from './edit-form/edit-form.component';
import { ViewFormsComponent } from './view-forms/view-forms.component';
import { FillFormComponent } from './fill-form/fill-form.component';

@NgModule({
  declarations: [
    AppComponent,
    FormsComponent,
    HomeComponent,
    LeftPanelComponent,
    NavbarComponent,
    EditFormComponent,
    ViewFormsComponent,
    FillFormComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
