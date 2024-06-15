import {Component, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {CardModule} from "primeng/card";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";
import {Router} from "@angular/router";
import {RegistroInterface} from "../../services/auth/authService/registro-interface";
import {LoginService} from "../../services/auth/authService/login.service";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {FileSelectEvent, FileUploadEvent, FileUploadModule} from "primeng/fileupload";

// interface UploadEvent {
//   originalEvent: Event;
//   files: File[];
// }

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    ButtonModule,
    CardModule,
    FormsModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    PaginatorModule,
    ReactiveFormsModule,
    ToastModule,
    FileUploadModule
  ],
  providers: [MessageService],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})

export class RegistroComponent implements OnInit{

  selectedFile: File | null = null;

  constructor(private formBuilder: FormBuilder, private router: Router, private loginService: LoginService, private messageService: MessageService) {
    if (loginService.isAuthenticated()){
      router.navigate(['/landing'])
    }
  }

  ngOnInit(): void {
    if (this.loginService.isAuthenticated()){
      this.router.navigate(['/landing'])
    }
  }

  // uploadedFiles: any[] = [];
  //
  // onUpload(event: FileUploadEvent) {
  //   for(let file of event.files) {
  //     this.uploadedFiles.push(file);
  //   }
  //   this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});

  // }

  registrarForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email, Validators.minLength(12), Validators.maxLength(70)]],
    username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50), Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\s]).*$/)]],
    name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
  })

  get username(){
    return this.registrarForm.get('username');
  }

  get password(){
    return this.registrarForm.get('password');
  }

  get email(){
    return this.registrarForm.get('email');
  }

  get name(){
    return this.registrarForm.get('name');
  }

  showError(detail: string = 'Vuelva a intentarlo') {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: detail });
  }

  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
  }

  registrar(){
    if(this.registrarForm.valid){
      const formData: FormData = new FormData();
      if (this.selectedFile) {
        formData.append('file', this.selectedFile);
      }
      const registroData: RegistroInterface = {
        username: this.registrarForm.get('username')?.value,
        password: this.registrarForm.get('password')?.value,
        name: this.registrarForm.get('name')?.value,
        email: this.registrarForm.get('email')?.value,
      };

      formData.append('registro', JSON.stringify(registroData));
      this.loginService.registro(formData).subscribe(
        {
          next: (data) => {
            console.log(data)
          },
          error: (error) => {
            this.showError(error);
          },
          complete: () => {
            console.log('Registro completado');
            this.router.navigateByUrl('/landing');
            this.registrarForm.reset();
            this.showSuccess();
          }
        }
      )
    }else {
      this.registrarForm.markAllAsTouched();
    }
  }

  seleccionaFile(event: FileSelectEvent) {
    const file = event.files[0];
    console.log(file.name)
    if (file) {
      this.selectedFile = file;
    }
  }


}
