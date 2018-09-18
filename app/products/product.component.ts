import { Component, OnInit } from '@angular/core';
import { Product } from './product';
import { ProductService } from './product.service';
import { clone } from 'lodash';

@Component({
    moduleId: module.id,
    templateUrl: 'product.template.html'
})

export class ProductComponent implements OnInit {

    products: Product[];
    productForm: boolean = false;
    isNewForm: boolean;
    newProduct: any = {};
    editProductForm: boolean = false;
    editedProduct: any = {};
    

    constructor(private productService: ProductService) {

    }

    ngOnInit() {
        this.getProducts();
    }

    getProducts() {
        this.products = this.productService.getProductsFromData();
    }

    showEditProductForm(product: Product) {
        if(!product) {
            this.productForm = false;
            return;
        }

        this.editProductForm = true;
        this.editedProduct = clone(product);
    }

    showAddProductForm() {
        if(this.products.length) {
            this.newProduct = {};
        }

        this.productForm = true;
        this.isNewForm = true;
    }

    saveProduct(product: Product) {
        if(this.isNewForm) {
            this.productService.addProduct(product);
        }
        this.productForm = false;
    }

    updateProduct() {
        this.productService.updateProduct(this.editedProduct);
        this.editProductForm = false;
        this.editedProduct = {};
    }

    cancelEdits() {
        this.editedProduct = {};
        this.editProductForm = false;
    }

    cancelNewProduct() {
        this.newProduct = {};
        this.productForm = false;
    }

    removeProduct(product: Product) {
        this.productService.deleteProduct(product);
    }
}
