import {Component, OnInit} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {LoginService} from "../../services/auth/authService/login.service";
import {Router, RouterLink} from "@angular/router";
import {EjercicioService} from "../../services/ejercicio/ejercicio.service";
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import {InputTextModule} from "primeng/inputtext";
import {FloatLabelModule} from "primeng/floatlabel";
import {MultiSelectModule} from "primeng/multiselect";
import {DificultadService} from "../../services/dificultad/dificultad.service";
import {Ejercicio} from "../../modelos/ejercicio";
import {Dificultad} from "../../modelos/dificultad";
import {FileSelectEvent, FileUploadModule, UploadEvent} from "primeng/fileupload";
import {User} from "../../modelos/user";
import {UserInterface} from "../../services/user/user-interface";
import {CountService} from "../../services/user/count.service";

@Component({
  selector: 'app-new-ejercicio',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    FloatLabelModule,
    MultiSelectModule,
    FileUploadModule,
    RouterLink
  ],
  templateUrl: './new-ejercicio.component.html',
  styleUrl: './new-ejercicio.component.scss'
})
export class NewEjercicioComponent implements OnInit{

  dificultades!: Dificultad[];
  selectedFile: File[] = [];

  isLogged: Boolean = false;
  userData?: String;
  protected sessionUser?: UserInterface | null

  constructor(private countService: CountService, private formBuilder: FormBuilder, private authService: LoginService, private router: Router, private ejercicioService: EjercicioService, private dificultadService: DificultadService) {
    if (!authService.isAuthenticated()){
      router.navigate(['/login'])
    }
  }

  ngOnInit(): void {
    this.dificultadService.getDificultades().forEach((dificultades) => {
      this.dificultades = dificultades;
      console.log(this.dificultades);
    })

    this.authService.currentSession.subscribe(
      {
        next:(currentSession) => {
          this.isLogged = currentSession;
        }
      }
    )

    this.authService.sessionData.subscribe(
      {
        next:(sessionData) => {
          this.userData = sessionData;
        }
      }
    )
    this.authService.sessionUser.subscribe(
      {
        next:(sessionUser) => {
          this.sessionUser = sessionUser;
        }
      }
    )
  }

  ejercicioForm = this.formBuilder.group({
    nombre: ['', [Validators.required, Validators.minLength(8)]],
    descripcion: ['', [Validators.required, Validators.minLength(20)]],
    dificultad: ['', Validators.required],
  })

  get nombre(){
    return this.ejercicioForm.get('nombre');
  }

  get descripcion(){
    return this.ejercicioForm.get('descripcion');
  }

  get dificultad(){
    return this.ejercicioForm.get('dificultad');
  }

  onUpload(event:FileSelectEvent) {
    for(let file of event.files) {
      this.selectedFile?.push(file);
    }
  }

  crear(){
    console.log('hola')
    if(this.ejercicioForm.valid){
      const formData: FormData = new FormData();
      console.log(this.ejercicioForm.get('dificultad')?.value);
      console.log();
      let jsonString: string = JSON.stringify(this.ejercicioForm.get('dificultad')?.value?.[0] ?? "");
      const dificultad: Dificultad = JSON.parse(jsonString);
      console.log(dificultad)

      const user: User = {
        username: this.sessionUser?.username ?? "",
        name: this.sessionUser?.name ?? "",
        foto: this.sessionUser?.foto ?? "",
        email: this.sessionUser?.email ?? "",
      }

      const ejercicioData: Ejercicio = {
        nombre: this.ejercicioForm.get('nombre')?.value ?? "",
        descripcion: this.ejercicioForm.get('descripcion')?.value ?? "",
        fechaCreacion: new Date(),
        dificultad: dificultad,
        user: user,
      };
      console.log("cipoteeee");
      console.log(this.selectedFile);
      console.log("cipoteeee");

      if (this.selectedFile && this.selectedFile.length > 0) {
        this.selectedFile.forEach((file: File) => {
          console.log("cipoteeeeeew")
          formData.append('files', file);
        });
      }

      formData.append('ejercicio', JSON.stringify(ejercicioData));
      console.log(formData.get("files"))

      console.log(JSON.stringify(ejercicioData))

      this.ejercicioService.saveEjercicio(formData).subscribe(
        {
          next: (data) => {
          },
          error: (error) => {

          },
          complete: () => {
            this.countService.incrementar();
            console.log('Crear ejercicio completado');
            this.router.navigateByUrl('/landing');
            this.ejercicioForm.reset();
          }
        }
      )
    }else {
      this.ejercicioForm.markAllAsTouched();
    }
  }
}
