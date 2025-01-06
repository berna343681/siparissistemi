import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  userAddForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.createUserAddForm();
  }

  createUserAddForm() {
    this.userAddForm = this.formBuilder.group({
      citizenId: ['', Validators.required],
      fullName: [''],
      email: ['', Validators.required],
      mobilePhones: ['', Validators.required],
      birthDate: [''],
      gender: [''],
      address: [''],
      notes: [''], 
      password: ['', Validators.required]
    });
  }

  add() {
    if (this.userAddForm.valid) {
      const userModel = Object.assign({}, this.userAddForm.value);
      this.userService.add(userModel).subscribe(
        response => {
          this.toastrService.success("Kullanıcı başarıyla eklendi.", "Başarılı");
        },
        error => {
          if (error.error && error.error.errors) {
            for (const key in error.error.errors) {
              if (error.error.errors.hasOwnProperty(key)) {
                this.toastrService.error(
                  error.error.errors[key].join(", "), // Hata mesajlarını birleştirir
                  "Doğrulama Hatası"
                );
              }
            }
          } else {
            this.toastrService.error("Bilinmeyen bir hata oluştu.", "Hata");
          }
        }
      );
    } else {
      this.toastrService.error("Formunuz eksik veya hatalı", "Dikkat");
    }
  }
  
  
  }
  





































