import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProductsService } from '../../shared/service/products.service';
import { Product } from '../../shared/interfaces/product.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CardComponent } from './components/card/card.component';
import { RouterLink, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-confirmation-dialog',
  template: `
  <h2 mat-dialog-title>Deletar produto</h2>
<mat-dialog-content>
  Tem certeza que quer deletar esse produto?
</mat-dialog-content>
<mat-dialog-actions align="center">
  <button mat-button (click)="onNo()">Não</button>
  <button mat-flat-button color="warn" (click)="onYes()" cdkFocusInitial>Sim</button>
</mat-dialog-actions> 
`,
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
})
export class ConfirmationDialogComponent {
   matdDialog = inject(MatDialogRef);

   onNo() {
    this.matdDialog.close(false);
   }
   onYes() {
    this.matdDialog.close(true);
   }
}

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardComponent, RouterLink, MatButtonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  products: Product[] = [];

  productsService = inject(ProductsService);
  router = inject(Router);
  matDialog = inject(MatDialog);

  ngOnInit() {
    this.productsService.getAll().subscribe((products) => {
      this.products = products
    });
  } 

  onEdit(product: Product) {
    this.router.navigate(['/edit-product', product.id]);
  }
  
  onDelete(product: Product) {
    this.matDialog.open(ConfirmationDialogComponent)
    .afterClosed()
    .pipe(filter(answer => answer === true))
    .subscribe((answer: boolean) => {
          this.productsService.delete(product.id).subscribe(() => {
            this.productsService.getAll().subscribe((products) => {
              this.products = products
            });
          });
    });
  }
}
