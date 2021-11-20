import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators,FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { RegistroService } from 'src/app/service/registro.service';
import { TipoUsuarioService } from 'src/app/service/TipoUsuarioService';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})


export class RegistroComponent {
  public registroForm: FormGroup;

  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  usuario: any;
  gender: any = ['Masculino','Femenino','otro'];
  userlvl: any = ['Administrador','Empleado'];
  function: any = ['Tesorero', 'Empleado','Financiero'];
  typedocument: any = ['Cedula de Ciudadania','Cedula de Extrangeria','Registro Civil','NIT']

  constructor(private router:Router,public registroService:RegistroService) {
    this.registroForm = this.createForm();
   }
   get nombre() {return this.registroForm.get('nombre');}
   get apellido() {return this.registroForm.get('apellido');}
   get telefono() {return this.registroForm.get('telefono');}
   get email() {return this.registroForm.get('email');}
   get contrasena() {return this.registroForm.get('contrasena');}
   get tDocumento() {return this.registroForm.get('tDocumento');}
   get nDocumento() {return this.registroForm.get('nDocumento');}
   get tUsuario() {return this.registroForm.get('tUsuario');}
   get funcionalidad() {return this.registroForm.get('funcionalidad');}
   get genero() {return this.registroForm.get('genero');}

  createForm(){
    return new FormGroup({
      nombre: new FormControl('',[Validators.required, Validators.minLength(5)]),
      email: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(this.emailPattern)]),
      apellido: new FormControl('',[Validators.required, Validators.minLength(5)]),
      telefono: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[- +()0-9]+')]),
      contrasena: new FormControl('',[Validators.required,Validators.minLength(8),Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}')]),
      tDocumento: new FormControl('',[Validators.required]),
      nDocumento: new FormControl('',[Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[- +()0-9]+')]),
      funcionalidad: new FormControl('',[Validators.required]),
      genero: new FormControl('',[Validators.required])
    })
  }
  changeGender(e) {
    this.gender.setValue(e.target.value, {
      onlySelf: true
    })
  }
  changeLVL(e) {
    this.userlvl.setValue(e.target.value, {
      onlySelf: true
    })
  }
  changeFunctionality(e) {
    this.function.setValue(e.target.value, {
      onlySelf: true
    })
  }
  changeDocument(e) {
    this.typedocument.setValue(e.target.value, {
      onlySelf: true
    })
  }

  onResetForm(): void{
    this.registroForm.reset();
  }

  onSaveForm():void {
    this.registroService.saveUsuario(this.registroForm.value).subscribe(resp => {
      this.registroForm.reset();
      this.usuario=this.usuario.filter(empleado=> resp.id!==this.usuario.id_emp);
      this.usuario.push(resp);
    },
      error => { console.error(error) }
    )
  }
  
  eliminar(usuarios){
    this.registroService.deleteUsuario(usuarios.id_emp).subscribe(resp=>{
      if(resp===true){
        this.usuario.pop(usuarios)
      }
    })
  }
  
}