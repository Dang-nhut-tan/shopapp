import express from "express";
const router = express.Router();
import * as ProductController from "./controllers/ProductController.js";
import * as OrderController from "./controllers/OrderController.js";
import * as CategoryController from "./controllers/CategoryController.js";
import * as OrderDetailController from "./controllers/OrderDetailController.js";
import * as BrandController from "./controllers/BrandController.js";
import InsertPorductReq from "./dtos/request/insertPorductReq.js";
import InsertOrderReq from "./dtos/request/insertOrderReq.js";
import InsertCategoryReq from "./dtos/request/insertCategoryReq.js";
import InsertOrderDetailReq from "./dtos/request/insertOrderDetailReq.js";
import InsertBrandReq from "./dtos/request/insertBrandReq.js";

import asyncHandler from "./middelwares/asyncHandler.js";
import validate from "./middelwares/validate.js";

export function AppRoute(app) {
  router.get("/products", ProductController.getProducts);
  router.get("/products/:id", ProductController.getProductsBYID);
  router.post(
    "/products",
    validate(InsertPorductReq),
    asyncHandler(ProductController.insertProducts),
  );
  router.put(
    "/products/:id",
    validate(InsertPorductReq),
    asyncHandler(ProductController.updateProducts),
  );
  router.delete("/products/:id", asyncHandler(ProductController.deleteProducts));

  router.get("/orders", OrderController.getOrders);
  router.get("/orders/:id", OrderController.getOrdersBYID);
  router.post(
    "/orders",
    validate(InsertOrderReq),
    asyncHandler(OrderController.insertOrders),
  );
  router.put(
    "/orders/:id",
    validate(InsertOrderReq),
    asyncHandler(OrderController.updateOrders),
  );
  router.delete("/orders/:id", asyncHandler(OrderController.deleteOrders));

  router.get("/categories", CategoryController.getCategories);
  router.get("/categories/:id", CategoryController.getCategoriesBYID);
  router.post(
    "/categories",
    validate(InsertCategoryReq),
    asyncHandler(CategoryController.insertCategories),
  );
  router.delete("/categories/:id", CategoryController.deleteCategories);

  router.get("/order-details", OrderDetailController.getOrderDetails);
  router.get("/order-details/:id", OrderDetailController.getOrderDetailsBYID);
  router.post(
    "/order-details",
    validate(InsertOrderDetailReq),
    asyncHandler(OrderDetailController.insertOrderDetails),
  );
  router.delete("/order-details/:id", OrderDetailController.deleteOrderDetails);

  router.get("/brands", BrandController.getBrands);
  router.get("/brands/:id", BrandController.getBrandsBYID);
  router.post(
    "/brands",
    validate(InsertBrandReq),
    asyncHandler(BrandController.insertBrands),
  );
  router.delete("/brands/:id", BrandController.deleteBrands);

  app.use("/api", router);
}
