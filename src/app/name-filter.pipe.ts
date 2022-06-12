import { PipeTransform, Pipe } from "@angular/core";
import { Post } from "../app/posts/Post.Model";

@Pipe({
    name: 'nameFilter'
})
export class nameFilterPipe implements PipeTransform{
    transform(posts: Post[], SearchValue: string) {
        if(!posts || !SearchValue){
            return posts;
        }

        return posts.filter(users=>
             users.name.toLowerCase().indexOf(SearchValue.toLowerCase()) !== -1);
    }
}