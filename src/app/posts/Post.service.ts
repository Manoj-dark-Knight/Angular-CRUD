import { Injectable } from "@angular/core";
import { Post } from "./Post.Model";
import { map, Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
@Injectable({
    providedIn: `root`
})
export class PostService{
    posts: Post[] = []; //this stores the posts record
    private postsUpdated = new Subject<Post[]>();

    constructor(private http: HttpClient){}

    getPosts(){
        this.http.get<{message: string, posts: any}>(`http://localhost:3000/posts/api`)
        .pipe(map((res)=>{
            return res.posts.map((post: { name: any; Email: any; MobNumber: any; DOB: any; Bio: any; _id: any; time:any; }) =>{
                return {
                    name: post.name,
                    Email: post.Email,
                    MobNumber: post.MobNumber,
                    DOB: post.DOB,
                    Bio: post.Bio,
                    id: post._id,
                    time: post.time
                }
            })
        }))
        .subscribe((res)=>{
            this.posts = res;
            this.postsUpdated.next([...this.posts]);
        })
    }

    getPostUpdateListener(){
        return this.postsUpdated.asObservable();
    }

    getEditPost(id: any){
        return {...this.posts.find(p =>{ p.id === id})}
    }

    addPost(name: string, Bio: any, Email: string, MobileNumber: number, DOB: Date, time: Date){
        const post: Post = {
            id: null,
            name: name,
            Bio: Bio,
            Email: Email,
            MobNumber: MobileNumber,
            DOB: DOB,
            time: time
        }
        this.http.post<{ message: string, id: string }>(`http://localhost:3000/posts/api`, post).subscribe((res)=>{
            const id = res.id;
            post.id = id;
            this.posts.push(post);
            this.postsUpdated.next([...this.posts]);
        })
        
    }

    updatedPost(id: string, name: string, Bio: any, Email: string, MobileNumber: number, DOB: Date, time: Date){
        const post: Post = {
            id: null,
            name: name,
            Bio: Bio,
            Email: Email,
            MobNumber: MobileNumber,
            DOB: DOB,
            time: time  
        }
        this.http.put(`http://localhost:3000/posts/api/${id}`, post).subscribe(res=>{
            console.log(res);
        })
    }

    DeletePost(id: string){
        this.http.delete(`http://localhost:3000/posts/api/${id}`).subscribe(()=>{
            console.log(`deleted`);
            const updatedPost = this.posts.filter(post => post.id !== id);
            this.posts = updatedPost;
            this.postsUpdated.next([...this.posts]);
        })
    }
}