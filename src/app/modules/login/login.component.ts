import { Router } from '@angular/router';
import { AuthServiceService } from './../../service/auth-service.service';
import { Component, OnInit } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormField,
    MatInputModule,
    MatLabel,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit{
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      senha: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  logar() {
    const username = this.form.get('username')?.value;
    const senha = this.form.get('senha')?.value;
   const isAuthenticated =  this.authService.login(username, senha)


   if(isAuthenticated){
    this.router.navigate(['nav'])
   }else{
    alert('Credenciais invalidas')
   }

  }

  validaCampos(): boolean {
    return this.form.valid;
  }
}
