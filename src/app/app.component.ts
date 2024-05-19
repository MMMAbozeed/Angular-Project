import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../Shared-Components/header/header.component';
import { FooterComponent } from '../Shared-Components/footer/footer.component';
import { ProductDetailsComponent } from '../components/product-details/product-details.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,HeaderComponent,FooterComponent,ProductDetailsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'e-commerce';
  productData: any = {
    name: 'Sample Product',
    description: 'This is a sample product description.',
    imageUrl: 'https://th.bing.com/th/id/OIP.-19UzfCf6IfZcP64gDqJawHaJQ?w=140&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7'
    // Add other properties as needed
  };
}
