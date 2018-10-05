import { Component, OnInit } from '@angular/core';
import { PostService } from '../shared/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  constructor(private postService: PostService) { }
  postArray = [];
  showDeletedMessage: boolean;

  ngOnInit() {
    this.postService.getPosts().subscribe(
      list => {
        this.postArray = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()

          };
        });
      });
 }



  onDelete($key) {
  if (confirm('¿Desea eliminar este post ?')) {
    this.postService.deletePost($key);
    this.showDeletedMessage = true;
    setTimeout(() => this.showDeletedMessage = false, 3000);
  }
}
}
