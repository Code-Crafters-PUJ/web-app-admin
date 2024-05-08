import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../../../services/sales-services/client/client.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sales-mail',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './sales-mail.component.html',
  styleUrl: './sales-mail.component.css'
})
export class SalesMailComponent implements OnInit {
  companyId: number | null = null;
  emailForm = this.formBuilder.group({
    subject: ['', Validators.required],
    description: ['', Validators.required],
  });

  constructor(public clientService: ClientService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    const companyIdString = sessionStorage.getItem('companyId');
    if (companyIdString) {
      this.companyId = parseInt(companyIdString, 10);
    }
  }

  sendEmail() {
    if (this.emailForm.invalid) {
      Swal.fire({
        title: "Email",
        text: "Llene por favor todos los campos",
        icon: "error"
      });
      return
    }
    this.clientService.sendEmail(this.companyId!, this.emailForm.value.subject!, this.emailForm.value.description!).subscribe(() => {
      Swal.fire({
        title: "Email",
        text: "Email se envió correctamente",
        icon: "success"
      })
    },
      () => {
        Swal.fire({
          title: "Email",
          text: "Error al enviar el email",
          icon: "error"
        })
      })
  }
}
