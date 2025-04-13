package com.productcatalog.service;

import com.productcatalog.entity.Product;
import java.util.List;

public interface ProductService {
    List<Product> getAllProducts();
    List<Product> searchProducts(String keyword);
    List<Product> getProductsByCategory(String category);
}



