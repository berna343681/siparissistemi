import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {
  user:User;
  userUpdateForm:FormGroup;

  constructor( private userService: UserService, private route: ActivatedRoute, private formbuilder: FormBuilder, private toastr: ToastrService ) {}

  ngOnInit() {
    this.createUserUpdateForm();
    const userId = +this.route.snapshot.paramMap.get('id');
    this.userService.getUserById(userId).subscribe(response => {
      if (response) {
        this.user = response;
        this.userUpdateForm.patchValue(this.user);
      } else {
        console.error('User not found!');
      }
    }, error => {
      console.error('Error fetching user:', error);
    });
  }
  

    createUserUpdateForm() {
      this.userUpdateForm = this.formbuilder.group({
        userId: ['', Validators.required],  
        email: ['', Validators.required],
        fullName: ['', Validators.required],
        mobilePhones: ['', Validators.required],
        address: ['', Validators.required],
        notes: ['', Validators.required],
      });
    }
    
    updateUser() {
      if (this.userUpdateForm.valid) {
        const userModel = { ...this.userUpdateForm.value };
        this.userService.updateUser(userModel).subscribe(response => {
          this.toastr.success('Success'); // Success mesajı
          console.log('User updated successfully:', response);
        }, error => {
          this.toastr.error('Error updating user. Please try again later.', 'Error'); // Error mesajı
          console.error('Error updating user:', error);
        });
      }
    }
  }
  












































