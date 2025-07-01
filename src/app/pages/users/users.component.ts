import { Component, inject, ViewChild, OnInit } from '@angular/core';
import { UserListComponent } from '../../components/user/user-list/user-list.component';
import { UserFormComponent } from '../../components/user/user-from/user-form.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { UserService } from '../../services/user.service';
import { ModalService } from '../../services/modal.service';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { IUser, IRoleType } from '../../interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    UserListComponent,
    PaginationComponent,
    ModalComponent,
    LoaderComponent,
    UserFormComponent
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  public userService: UserService = inject(UserService);
  public modalService: ModalService = inject(ModalService);
  public authService: AuthService = inject(AuthService);
  public router: Router = inject(Router);
  public isSuperAdmin = false;
  
  @ViewChild('addUsersModal') public addUsersModal: any;
  public fb: FormBuilder = inject(FormBuilder);
  userForm = this.fb.group({
    id: [''],
    email: ['', Validators.required, Validators.email],
    name: ['', Validators.required],
    lastname: ['', Validators.required],
    password: ['', Validators.required],
    updatedAt: ['', Validators.required],
  })

  constructor() {
    this.userService.search.page = 1;
  }
  
  ngOnInit(): void {
    // Verificar si el usuario es SUPER_ADMIN
    this.isSuperAdmin = this.authService.hasRole(IRoleType.superAdmin);
    
    // Si no es SUPER_ADMIN, redirigir a página de acceso denegado
    if (!this.isSuperAdmin) {
      this.router.navigate(['/access-denied']);
      return;
    }
    
    // Cargar la lista de usuarios
    this.userService.getAll();
  }

  saveUser(user: IUser) {
    this.userService.save(user);
    this.modalService.closeAll();
  }

  callEdition(user: IUser) {
    this.userForm.controls['id'].setValue(user.id ? JSON.stringify(user.id) : '');
    this.userForm.controls['email'].setValue(user.email ? user.email : '');
    this.userForm.controls['name'].setValue(user.name ? JSON.stringify(user.name) : '');
    this.userForm.controls['lastname'].setValue(user.lastname ? JSON.stringify(user.lastname) : '');
    this.userForm.controls['password'].setValue(user.password ? JSON.stringify(user.password) : '');
    this.modalService.displayModal('md', this.addUsersModal);
  }

  updateUser(user: IUser) {
    this.userService.update(user);
    this.modalService.closeAll();
  }
  
}
