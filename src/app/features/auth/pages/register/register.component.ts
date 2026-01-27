import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { CustomerService } from '../../services/customer.service';

import { LanguageSelectorComponent } from '../../../../shared/components/language-selector/language-selector.component';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, TranslateModule, LanguageSelectorComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  currentStep: number = 1;
  showPassword: boolean = false;
  submitted= false;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private translate: TranslateService,
    private authService: AuthService,
    private customerService: CustomerService,
    private router: Router, 
    private toastService: ToastService) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      // countryCode: ['+1', Validators.required],
      phone: ['', Validators.required],
      companyName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      taxId: ['', Validators.required],
      // agreeTerms: [false, Validators.requiredTrue]
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

   onFileSelected(event: any): void {
        const file = event.target.files[0];
        if (file) {
            this.handleFile(file);
        }
    }

    handleFile(file: File): void {
        // if (!file.type.startsWith('image/')) {
        //     this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please select an image file' });
        //     return;
        // }
        this.selectedFile = file;
        const reader = new FileReader();
        reader.onload = () => {
            // this.imagePreview = reader.result as string;
        };
        reader.readAsDataURL(file);
    }


  nextStep() {
    if (this.currentStep === 1) {
      // Validate step 1 fields
      const step1Fields = ['firstName', 'lastName', 'email', 'phone', 'countryCode', 'country'];
      let isStepValid = true;

      step1Fields.forEach(field => {
        const control = this.registerForm.get(field);
        if (control?.invalid) {
          control.markAsTouched();
          isStepValid = false;
        }
      });

      if (!isStepValid) {
        alert(this.translate.instant('REGISTER.ERROR.FILL_ALL_FIELDS'));
        return;
      }
      this.currentStep = 2;
    }
  }

  previousStep() {
    if (this.currentStep === 2) {
      this.currentStep = 1;
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    if (this.selectedFile) {

    }

    // const { password, confirmPassword } = this.registerForm.value;

    // Password validation
    // if (password !== confirmPassword) {
    //   alert(this.translate.instant('REGISTER.ERROR.PASSWORD_MISMATCH'));
    //   return;
    // }
     this.customerService.createCustomer(this.prepareFormData()).subscribe(res=>{
            console.log(res);
            this.toastService.showSuccess(`${this.translate.instant('REGISTER.ERROR.REGISTRATION_SUCCESS')}`);
              this.router.navigate(['/auth/login']);
          },
        (er)=>{ 
    console.log(er);
  })
  //   let body= this.registerForm.value;

  //   body.roleId = 'Customer'
  //   this.authService.register(body).subscribe((res:any )=>{
  //      debugger
  //         console.log(res);
         
  //   },
  // (er)=>{ 
  //   debugger;
  //   console.log(er);
  // })
    // this.authService.register(body).subscribe({
    //     next: (res) => {
    //       debugger
    //       console.log(res);
    //       this.customerService.createCustomer(this.registerForm.value).subscribe({
    //         next: (res) => {
    //           debugger;
    //           console.log(res);
    //           this.toastService.showSuccess(`Registration successful!`);
    //           this.router.navigate(['/auth/login']);
    //           // alert(this.translate.instant('LOGIN.UI_ONLY_ALERT'));
    //         },
    //         error: (err) => {
    //           debugger;
    //           console.log(err);
    //           alert(this.translate.instant('LOGIN.UI_ONLY_ALERT'));
    //         }
    //       });
    //       // this.toastService.showSuccess(`Registration successful!`);
    //       // this.router.navigate(['/home']);
    //       // alert(this.translate.instant('LOGIN.UI_ONLY_ALERT'));
    //     },
    //     error: (err) => {
    //       debugger;
    //       console.log(err);
    //       alert(this.translate.instant('LOGIN.UI_ONLY_ALERT'));
    //     }
    //   });
    // This is just UI - no actual registration
    // console.log('Registration attempted with:', {
    //   ...this.registerForm.value,
    //   password: '***',
    //   confirmPassword: '***'
    // });

    // alert(this.translate.instant('REGISTER.UI_ONLY_ALERT'));
  }

   prepareFormData(): FormData {
        const formData = new FormData();
        formData.append('firstName', this.registerForm.value.firstName);
        formData.append('lastName', this.registerForm.value.lastName);
        formData.append('email', this.registerForm.value.email);
        formData.append('phoneNumber', this.registerForm.value.phone);
        formData.append('companyName', this.registerForm.value.companyName);
        formData.append('taxID', this.registerForm.value.taxId);
        if (this.selectedFile) {
            formData.append('customerFile', this.selectedFile);
        }
       
        return formData;
    }
}
