import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ToastService } from '../../shared/services/toast.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastService) as ToastService;

  return next(req).pipe(
    catchError((error) => {
      const status = error?.status;
      let message = 'An unexpected error occurred';

      if (status >= 500) {
        message = 'Server error. Please try again later.';
      } else if (status === 0) {
        message = 'Network error. Check your connection.';
      } else if (status === 404) {
        message = 'Requested resource not found.';
      } else if (status === 401) {
        message = 'Unauthorized. Please log in again.';
      } else if (status === 400) {
        message = 'Bad request. Please check your input.';
      } else if (error?.error?.message) {
        message = error.error.message;
      }

      toast.showError(message);
      return throwError(() => error);
    })
  );
};

