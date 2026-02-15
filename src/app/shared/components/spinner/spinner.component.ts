import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerService } from '../../services/spinner.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-spinner',
  imports: [CommonModule],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss'
})
export class SpinnerComponent {
  private spinnerService = inject(SpinnerService);
  loading$: Observable<boolean> = this.spinnerService.loading$;
}
