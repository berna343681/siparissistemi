import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.css']
})
export class UserDeleteComponent {
  userId: number;

  constructor(
    private userService: UserService,
    private toastrService: ToastrService
  ) {}

  deleteUser() {
    if (this.userId) {
      this.userService.deleteUser(this.userId)
        .subscribe(
          response => {
            console.log('Silme işlemi yanıtı:', response); // Debug için yanıtı kontrol edin
            
            if (response === 'Deleted') { // Backend'den tam olarak "deleted" yanıtı bekliyoruz
              this.toastrService.success('Kullanıcı başarıyla silindi.');
              this.refreshUserList();  // Kullanıcı listesi güncelleniyor
            } else {
              this.toastrService.error('Kullanıcı silme işlemi başarısız.');
            }
          },
          error => {
            this.toastrService.error('Silme işlemi sırasında bir hata oluştu.');
            console.error('Silme hatası:', error);
          }
        );
    } else {
      this.toastrService.error('Kullanıcı ID girilmelidir.');
    }
  }
  
  
  refreshUserList() {
    // Kullanıcıları yeniden yükleyin
    this.userService.getUsers().subscribe(users => {
      // Kullanıcıları güncelleyin
      // ... bu kısmı bileşen yapınıza göre doldurmanız gerekecek
    });
  }
  
}
