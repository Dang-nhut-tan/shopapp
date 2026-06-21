import express from "express";
const router = express.Router();
import * as ProductController from "./controllers/ProductController.js";
import * as OrderController from "./controllers/OrderController.js";
import * as CategoryController from "./controllers/CategoryController.js";
import * as OrderDetailController from "./controllers/OrderDetailController.js";
import * as BrandController from "./controllers/BrandController.js";
import * as UserController from "./controllers/UserController.js";
import InsertPorductReq from "./dtos/request/product/insertPorductReq.js";
import InsertOrderReq from "./dtos/request/order/insertOrderReq.js";
import InsertCategoryReq from "./dtos/request/category/insertCategoryReq.js";
import InsertOrderDetailReq from "./dtos/request/orderDetail/insertOrderDetailReq.js";
import InsertBrandReq from "./dtos/request/brand/insertBrandReq.js";
import InsertUserReq from "./dtos/request/user/insertUserReq.js";
import UpdateProductReq from "./dtos/request/product/updateProductReq.js";
import UpdateOrderReq from "./dtos/request/order/updateOrderReq.js";
import UpdateCategoryReq from "./dtos/request/category/updateCategoryReq.js";
import UpdateBrandReq from "./dtos/request/brand/updateBrandReq.js";
import UpdateUserReq from "./dtos/request/user/updateUserReq.js";

import asyncHandler from "./middelwares/asyncHandler.js";
import validate from "./middelwares/validate.js";

export function AppRoute(app) {
  router.get("/products", asyncHandler(ProductController.getProducts));
  router.get("/products/:id", asyncHandler(ProductController.getProductsBYID));
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

  router.get("/orders", asyncHandler(OrderController.getOrders));
  router.get("/orders/:id", asyncHandler(OrderController.getOrdersBYID));
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

  router.get("/categories", asyncHandler(CategoryController.getCategories));
  router.get(
    "/categories/:id",
    asyncHandler(CategoryController.getCategoriesBYID),
  );
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

  router.get("/order-details", asyncHandler(OrderDetailController.getOrderDetails));
  router.get(
    "/order-details/:id",
    asyncHandler(OrderDetailController.getOrderDetailsBYID),
  );
  router.post(
    "/order-details",
    validate(InsertOrderDetailReq),
    asyncHandler(OrderDetailController.insertOrderDetails),
  );
  router.delete(
    "/order-details/:id",
    asyncHandler(OrderDetailController.deleteOrderDetails),
  );

  router.get("/brands", asyncHandler(BrandController.getBrands));
  router.get("/brands/:id", asyncHandler(BrandController.getBrandsBYID));
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


  router.get("/users", asyncHandler(UserController.getUsers));
  router.get("/users/:id", asyncHandler(UserController.getUsersBYID));
  router.post(
    "/users",
    validate(InsertUserReq),
    asyncHandler(UserController.insertUsers),
  );
  router.put(
    "/users/:id",
    validate(UpdateUserReq),
    asyncHandler(UserController.updateUsers),
  );
  router.delete("/users/:id", asyncHandler(UserController.deleteUsers));

  app.use("/api", router);
}
