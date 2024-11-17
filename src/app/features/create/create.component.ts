import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';  
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ProductsService } from '../../shared/service/products.service';
import { subscribeOn } from 'rxjs';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {

  productsService = inject(ProductsService);

  form = new FormGroup({
    title: new FormControl<string>( '', { 
      nonNullable: true, 
      validators: Validators.required
    }),
  });

  onSubmit () {
    this.productsService.post({
      title: this.form.controls.title.value
    })
    .subscribe(() => {
      alert('Sucesso!');
    })

  }
}
