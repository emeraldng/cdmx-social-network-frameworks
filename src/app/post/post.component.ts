import { Component, OnInit } from '@angular/core';
import { PostService } from '../shared/post.service';
// import * as Post from 'post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  constructor(public postService: PostService) { }
  submitted: boolean;
  showSuccessMessage: boolean;
  formControls = this.postService.form.controls;

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
    if (this.postService.form.valid) {
      if (this.postService.form.get('$key').value == null)
      this.postService.insertPost(this.postService.form.value);
      else
       this.postService.updatePost(this.postService.form.value);
      this.showSuccessMessage = true;
      setTimeout(() => this.showSuccessMessage = false, 3000);
      this.submitted=false;
      this.postService.form.reset();
    }

  }

}
