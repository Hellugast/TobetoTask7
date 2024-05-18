import { Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryUpdateComponent } from './category-update/category-update.component';
import { AppComponent } from './app.component';

export const routes: Routes = [

   
    {
        path: 'categories',
        component: CategoriesComponent,
        title: 'Home page'
    },
    {
        path: 'categories/update/:id',
        component: CategoryUpdateComponent,
        title: 'Home details'
    }
];
