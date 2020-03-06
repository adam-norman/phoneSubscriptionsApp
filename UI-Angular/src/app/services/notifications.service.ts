import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  constructor(
    private toaster: ToastrService
    ) {

   }
  showSuccess(msg: string) {
    this.toaster.success(msg, 'عملية ناجحة');
  }
  showError(msg: string) {
    this.toaster.error(msg, 'خطأ');
  }
  showInfo(msg: string) {
    this.toaster.info(msg, 'معلومة');
  }

  showWarning(msg: string) {
    this.toaster.warning(msg, 'تحذير');
  }
}
