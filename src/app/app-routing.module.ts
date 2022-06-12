import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { PostCreateComponent } from "./posts/Post-create-component/post-create.component";
import { PostListsComponent } from "./posts/post-lists/post-lists.component";

const routes: Routes = [
    {path: ``, component: PostCreateComponent},
    {path: `edit/:PostID`, component: PostCreateComponent},
    {path: `User`, component: PostListsComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule{

}