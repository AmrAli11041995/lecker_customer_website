import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { SpinnerService } from '../../shared/services/spinner.service';

export const spinnerInterceptor: HttpInterceptorFn = (req, next) => {
    const spinnerService = inject(SpinnerService);

    // Show spinner when request starts
    spinnerService.show();

    return next(req).pipe(
        finalize(() => {
            // Hide spinner when response is received (success or error)
            spinnerService.hide();
        })
    );
};
