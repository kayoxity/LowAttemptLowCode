import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditFormComponent } from './edit-form/edit-form.component';
import { FillFormComponent } from './fill-form/fill-form.component';
import { HomeComponent } from './home/home.component';
import { ViewFormsComponent } from './view-forms/view-forms.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'create', component: EditFormComponent},
    { path: 'forms/:id/edit', component: EditFormComponent},
    { path: 'forms/:id/fill', component: FillFormComponent},
    { path: 'forms', component: ViewFormsComponent},
    { path: '**', component: HomeComponent}
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {

}