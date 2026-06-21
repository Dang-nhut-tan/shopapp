import express from "express";
const router = express.Router();
import * as ProductController from "./controllers/ProductController.js";
import * as OrderController from "./controllers/OrderController.js";
import * as CategoryController from "./controllers/CategoryController.js";
import * as OrderDetailController from "./controllers/OrderDetailController.js";
import * as BrandController from "./controllers/BrandController.js";
import InsertPorductReq from "./dtos/request/product/insertPorductReq.js";
import InsertOrderReq from "./dtos/request/order/insertOrderReq.js";
import InsertCategoryReq from "./dtos/request/category/insertCategoryReq.js";
import InsertOrderDetailReq from "./dtos/request/orderDetail/insertOrderDetailReq.js";
import InsertBrandReq from "./dtos/request/brand/insertBrandReq.js";
import UpdateProductReq from "./dtos/request/product/updateProductReq.js";
import UpdateOrderReq from "./dtos/request/order/updateOrderReq.js";
import UpdateCategoryReq from "./dtos/request/category/updateCategoryReq.js";
import UpdateBrandReq from "./dtos/request/brand/updateBrandReq.js";

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
    validate(UpdateProductReq),
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
    validate(UpdateOrderReq),
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
  router.put(
    "/categories/:id",
    validate(UpdateCategoryReq),
    asyncHandler(CategoryController.updateCategories),
  );
  router.delete(
    "/categories/:id",
    asyncHandler(CategoryController.deleteCategories),
  );

  router.get("/order-details", OrderDetailController.getOrderDetails);
  router.get("/order-details/:id", OrderDetailController.getOrderDetailsBYID);
  router.post(
    "/order-details",
    validate(InsertOrderDetailReq),
    asyncHandler(OrderDetailController.insertOrderDetails),
  );
  router.delete(
    "/order-details/:id",
    asyncHandler(OrderDetailController.deleteOrderDetails),
  );

  router.get("/brands", BrandController.getBrands);
  router.get("/brands/:id", BrandController.getBrandsBYID);
  router.post(
    "/brands",
    validate(InsertBrandReq),
    asyncHandler(BrandController.insertBrands),
  );
  router.put(
    "/brands/:id",
    validate(UpdateBrandReq),
    asyncHandler(BrandController.updateBrands),
  );
  router.delete("/brands/:id", asyncHandler(BrandController.deleteBrands));

  app.use("/api", router);
}
