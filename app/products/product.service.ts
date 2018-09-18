import { Injectable } from '@angular/core';
import { Product } from './product';
import { PRODUCT_ITEMS } from './product-data';
import { findIndex } from 'lodash';

@Injectable()
export class ProductService {
    private pitems = PRODUCT_ITEMS;
    
    getProductsFromData(): Product[] {
        return this.pitems;
    }

    addProduct(product: Product) {
        this.pitems.push(product);
    }

    updateProduct(product: Product) {
        let index = findIndex(this.pitems, (p: Product) => {
            return p.id === product.id;
        })
        this.pitems[index] = product;
    }

    deleteProduct(product: Product) {
        this.pitems.splice(this.pitems.indexOf(product), 1);
    }
}