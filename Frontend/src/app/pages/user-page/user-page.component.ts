import {Component, OnInit} from '@angular/core';
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import {InputTextModule} from "primeng/inputtext";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {LoginService} from "../../services/auth/authService/login.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {FileSelectEvent, FileUploadModule} from "primeng/fileupload";
import {RegistroInterface} from "../../services/auth/authService/registro-interface";
import {ToastModule} from "primeng/toast";
import {StyleClassModule} from "primeng/styleclass";
import {UserInterface} from "../../services/user/user-interface";
import {NgOptimizedImage} from "@angular/common";
import {environment} from "../../../environments/environment";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    ReactiveFormsModule,
    ToastModule,
    StyleClassModule,
    NgOptimizedImage,
    FileUploadModule,
    RouterLink,
    ConfirmDialogModule
  ],
  providers:[
    MessageService,
    ConfirmationService,
    UserService
  ],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss'
})
export class UserPageComponent implements OnInit{

  imageUrl: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  protected sessionUser?: UserInterface | null

  constructor(private formBuilder: FormBuilder, private userService: UserService, private confirmationService: ConfirmationService, private router: Router, private loginService: LoginService, private messageService: MessageService) {
    if (!loginService.isAuthenticated()){
      router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
    this.loginService.sessionUser.subscribe(
      {
        next:(sessionUser) => {
          this.sessionUser = sessionUser;
        }
      }
    )
    this.updateForm.setValue({
      email: this.sessionUser?.email ?? null,
      username: this.sessionUser?.username ?? null,
      password: '',
      name: this.sessionUser?.name ?? null
    });
  }

  updateForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email, Validators.minLength(12), Validators.maxLength(70)]],
    username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50), Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\s]).*$/)]],
    name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
  })

  get username(){
    return this.updateForm.get('username');
  }

  get password(){
    return this.updateForm.get('password');
  }

  get email(){
    return this.updateForm.get('email');
  }

  get name(){
    return this.updateForm.get('name');
  }

  showError(detail: string = 'Vuelva a intentarlo') {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: detail });
  }

  update(){
    if(this.updateForm.valid){
      const formData: FormData = new FormData();

      const registroData: RegistroInterface = {
        username: this.updateForm.get('username')?.value,
        password: this.updateForm.get('password')?.value,
        name: this.updateForm.get('name')?.value,
        email: this.updateForm.get('email')?.value,
      };

      if (this.selectedFile) {
        formData.append('file', this.selectedFile);
      }
      formData.append('registro', JSON.stringify(registroData));
      formData.append('usernameSession', this.sessionUser?.username ?? '');

      this.loginService.update(formData).subscribe(
        {
          next: (data) => {
            console.log(data)
          },
          error: (error) => {
            this.showError("Ha ocurrido un error");
          },
          complete: () => {
            console.log('Update completado');
            this.router.navigateByUrl('/landing');
            this.updateForm.reset();
          }
        }
      )
    }else {
      this.updateForm.markAllAsTouched();
    }
  }

  seleccionaFile(event: FileSelectEvent) {
    const file = event.files[0];
    console.log(file.name)
    if (file) {
      this.selectedFile = file;
      console.log(this.selectedFile)
    }
    const reader = new FileReader();
    reader.onload = () => {
      this.imageUrl = reader.result;
    };
    reader.readAsDataURL(file);
  }

  confirmarBorrar() {
    this.confirmationService.confirm({
      header: '¿Estas seguro de que quieres borrar tu cuenta?',
      message: 'Se borrarran tus posts de los ejercicios anteriormente hechos',

      accept: () => {
        this.messageService.add({ severity: 'error', summary: '¡Adiós!', detail: 'Has borrado tu cuenta', life: 3000 });
        this.userService.deleteUser(this.sessionUser?.username ?? "").subscribe(
          {
            next: (data) => {
              console.log(data)
            },
            error: (error) => {
              this.showError("Ha ocurrido un error");
            },
            complete: () => {
              console.log('Update completado');
              this.loginService.logout();
              this.router.navigateByUrl('/login');
              this.updateForm.reset();
            }
          }
        )
      },
      reject: () => {
        this.messageService.add({ severity: 'success', summary: '¡Bien hecho!', detail: '¡No dejes a los demas usuarios sin tus ejercicios!', life: 3000 });
      },
    });
  }

  protected readonly environment = environment;
}
