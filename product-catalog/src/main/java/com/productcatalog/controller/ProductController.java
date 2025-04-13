package com.productcatalog.controller;

import com.productcatalog.entity.Product;
import com.productcatalog.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    // All products
    @GetMapping
    public String viewAllProducts(Model model) {
        List<Product> products = productService.getAllProducts();
        model.addAttribute("products", products);
        return "products"; // points to templates/products.html
    }

    // Search functionality
    @GetMapping("/search")
    public String searchProducts(@RequestParam String keyword, Model model) {
        List<Product> results = productService.searchProducts(keyword);
        model.addAttribute("products", results);
        return "products";
    }

    // Category filter
    @GetMapping("/category")
    public String viewByCategory(@RequestParam String type, Model model) {
        List<Product> products = productService.getProductsByCategory(type);
        model.addAttribute("products", products);
        model.addAttribute("category", type);
        return "products";
    }
}
