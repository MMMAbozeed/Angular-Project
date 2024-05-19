import { Component ,Input, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products/products.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Iproducts } from '../../interfaces/products/iproducts';
import { RouterModule } from '@angular/router';
import { WordsPipe } from "../../pipes/words.pipe";

@Component({
    selector: 'app-products',
    standalone: true,
    providers: [ProductsService,CommonModule],
    templateUrl: './products.component.html',
    styleUrl: './products.component.css',
    imports: [HttpClientModule, CommonModule, RouterModule, WordsPipe]
})
export class ProductsComponent implements OnInit {
CatList:any
list :Iproducts[] = [];
constructor(private prodS:ProductsService)
{

}
getCat()
{

  this.prodS.getAllcat().subscribe((res:any)=>{
    console.log(res);
    this.CatList=res;
  },error=>{
    console.log(error.message);
  });
  console.log(this.CatList);
}
ngOnInit(): void {
  this.getProducts();
  this.getCat();
}
getProductsBYCat(cat:string)
{

  this.prodS.getProductByCat(cat).subscribe((res:any)=>{
    this.list=res;
  })
}
OnchangeCat(data:any){
  let val = data.target.value;
  console.log(data.target.value);
  if(val!='ALL')
    this.getProductsBYCat(val);
  else
    this.getProducts();
}
getProducts(){
  this.prodS.GetAllProducts().subscribe(
    (data:any)=>{
      console.log(data);
      this.list = data
    }
  )
}
}
