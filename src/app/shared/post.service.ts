import { Injectable } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms'; 
import { FormGroup, FormControl } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private firebase: AngularFireDatabase) { }
  postList: AngularFireList<any>;

  form = new FormGroup({
    $key: new FormControl(null),
    texto: new FormControl('', Validators.required)
  });
  
  getPosts() {
    this.postList = this.firebase.list('post');
    return this.postList.snapshotChanges();
  }

  insertPost(post) {
    this.postList.push({
      texto : post.texto
      // fecha : timestamp
  });
}

    populateForm(post) {
      this.form.setValue(post);
    }
  
    updatePost(post) {
      this.postList.update(post.$key,
        {
          texto : post.texto
          
        });
    }
  
    deletePost($key: string) {
      this.postList.remove($key);
    }
  
  

  
}
