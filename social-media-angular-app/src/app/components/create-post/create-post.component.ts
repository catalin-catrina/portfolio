import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { PostsService } from '../../services/posts.service';

@Component({
    selector: 'app-create-post',
    imports: [FormsModule, MatInputModule, MatFormFieldModule, CommonModule],
    templateUrl: './create-post.component.html',
    styleUrl: './create-post.component.scss'
})
export class CreatePostComponent {
  file: File | null = null;
  description: string = '';
  imageUrl: string | ArrayBuffer | null = null;

  private postsService = inject(PostsService);

  onSubmit(form: NgForm) {
    const description = form.value.description;
    if (this.file) {
      this.postsService.writeImageToStorage(this.file).then((imageUrl) => {
        this.postsService.writePostToFirestore(description, imageUrl);
      });
    }
  }

  // Get the selected file from input
  onFileSelected(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      this.file = fileList[0];
      this.getImageUrl();
    }
  }

  // Generate an image preview to display in component
  getImageUrl() {
    const reader = new FileReader();

    reader.onload = (e) => {
      this.imageUrl = e.target?.result || null;
    };

    if (this.file) {
      reader.readAsDataURL(this.file);
    }
  }
}
