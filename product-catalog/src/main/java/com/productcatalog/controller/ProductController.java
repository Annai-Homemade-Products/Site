package com.productcatalog.controller;

import com.productcatalog.entity.Product;
import com.productcatalog.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
public class ProductController {

    @Autowired
    private ProductService productService;

    // Home Page Mapping
    @GetMapping("/")
    public String homePage() {
        return "home";  // This should correctly return home.html
    }

    // Catalog Page Mapping
    @GetMapping("/catalog")
    public String catalogPage(Model model) {
        List<Product> products = productService.getAllProducts();
        model.addAttribute("products", products);
        return "catalog";  // This should correctly return catalog.html
    }
}
