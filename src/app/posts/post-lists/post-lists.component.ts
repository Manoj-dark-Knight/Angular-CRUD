import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { map, Observable, startWith, Subscription } from "rxjs";
import { Post } from "../Post.Model";
import { PostService } from "../Post.service";
import { nameFilterPipe } from "src/app/name-filter.pipe";

@Component({
    selector: `app-post-list`,
    templateUrl: `./post-lists.component.html`,
    styleUrls: [`./post-lists.component.css`]
})

export class PostListsComponent implements OnInit, OnDestroy {
    
    posts: Post[] = [];
    public PostSub: Subscription | null = null;
    date: Date = new Date();
    SearchValue: string = '';

    constructor(public PostService: PostService){

    }
    ngOnInit(): void {
        this.PostService.getPosts();
        this.PostSub = this.PostService.getPostUpdateListener().subscribe((res)=>{
            this.posts = res;
        });
    }

    Delete(postID: string){
        this.PostService.DeletePost(postID);
    }
    
    ngOnDestroy(){
        this.PostSub?.unsubscribe();
    }
}