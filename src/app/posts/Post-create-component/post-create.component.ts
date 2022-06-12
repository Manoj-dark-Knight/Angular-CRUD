import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Post } from "../Post.Model";
import { PostService } from "../Post.service";

@Component({
    selector: `app-post-create`,
    templateUrl: `./post-create.component.html`,
    styleUrls: [`./post-create.component.css`]
})
export class PostCreateComponent implements OnInit{
    UsrTitle: string = '';
    UsrContent: string = ``;
    startDate = new Date();
    post: Post | any = null;

    private mode = `edit`;
    private postId: any;
    
    constructor(public PostService: PostService, public route: ActivatedRoute){

    }

    ngOnInit(): void {
      this.route.paramMap.subscribe((paramMap: ParamMap)=>{
          console.log("paramMap", paramMap);
          if (paramMap.has(`PostID`)) {
              console.log(`went to if block`)
            this.mode = `edit`;
            this.postId = paramMap.get(`PostID`);
            this.post = this.PostService.getEditPost(this.postId);
          }else {
              console.log(`went in else block`)
              this.mode = `create`;
              this.postId = null;
          }

      });  
    }

    onBtnClick(form: NgForm){
        if(form.invalid){
            return;
        }
        console.log(this.mode);
        console.log(this.postId);
        if (this.mode === "edit") {
            this.PostService.updatedPost(this.postId, form.value.name, form.value.Bio, form.value.Email, form.value.MobNumber, form.value.DOB, this.startDate)
        }else{
            this.PostService.addPost(form.value.name, form.value.Bio, form.value.Email, form.value.MobNumber, form.value.DOB, this.startDate);
        }
        form.resetForm();         
    }    
     
}