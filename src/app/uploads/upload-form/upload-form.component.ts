import { Component } from '@angular/core';

import { UploadService } from '../shared/upload.service';

import { Upload } from '../shared/upload';

@Component({
  selector: 'upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./up.css'],
})
export class UploadFormComponent {

  selectedFiles: FileList | null;
  currentUpload: Upload;
  showSpinner = true;

  constructor(private upSvc: UploadService) { }

  detectFiles($event: Event) {
      this.selectedFiles = ($event.target as HTMLInputElement).files;
  }

  uploadSingle() {
    
    const file = this.selectedFiles;
    if (file && file.length === 1) {
      this.currentUpload = new Upload(file.item(0));
      this.upSvc.pushUpload(this.currentUpload);
    } else {
      console.error('não tem arquivos!');
    }
  }

  uploadMulti() {
    this.showSpinner = true;
    const files = this.selectedFiles;
    if (!files || files.length === 0) {
      console.error('não tem arquivos!');
      return;
    }
  
    Array.from(files).forEach((file) => {
      this.currentUpload = new Upload(file);
      this.upSvc.pushUpload(this.currentUpload);
    });
  }
}
