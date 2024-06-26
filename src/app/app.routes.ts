import { Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryUpdateComponent } from './category-update/category-update.component';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { ProductUpdateComponent } from './product-update/product-update.component';
import { PipeExamplesComponent } from './pipe-examples/pipe-examples.component';
import { DirectiveExamplesComponent } from './directive-examples/directive-examples.component';

export const routes: Routes = [


    {
        path: 'categories',
        component: CategoriesComponent,
        title: 'Categories page'
    },
    {
        path: 'categories/update/:id',
        component: CategoryUpdateComponent,
        title: 'Category details'
    },
    {
        path: 'products',
        component: ProductsComponent,
        title: 'Product page'
    },
    {
        path: 'products/update/:id',
        component: ProductUpdateComponent,
        title: 'Product details'
    },
    {
        path: 'pipes',
        component: PipeExamplesComponent,
        title: 'Pipe examples'
    },
    {
        path: 'directives',
        component: DirectiveExamplesComponent,
        title: 'Directive examples'
    }
];
