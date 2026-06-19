import express from 'express'
const router=express.Router()
import* as ProductController  from './controllers/ProductController.js'
import* as OrderController  from './controllers/OrderController.js'
import* as CategoryController  from './controllers/CategoryController.js'
import* as OrderDetailController  from './controllers/OrderDetailController.js'
import* as BrandController  from './controllers/BrandController.js'

export function AppRoute(app)
{
    router.get('/products',ProductController.getProducts)
    router.get('/products/:id',ProductController.getProductsBYID)
    router.post('/products',ProductController.insertProducts)
    router.delete('/products/:id',ProductController.deleteProducts)

    router.get('/orders',OrderController.getOrders)
    router.get('/orders/:id',OrderController.getOrdersBYID)
    router.post('/orders',OrderController.insertOrders)
    router.delete('/orders/:id',OrderController.deleteOrders)

    router.get('/categories',CategoryController.getCategories)
    router.get('/categories/:id',CategoryController.getCategoriesBYID)
    router.post('/categories',CategoryController.insertCategories)
    router.delete('/categories/:id',CategoryController.deleteCategories)

    router.get('/order-details',OrderDetailController.getOrderDetails)
    router.get('/order-details/:id',OrderDetailController.getOrderDetailsBYID)
    router.post('/order-details',OrderDetailController.insertOrderDetails)
    router.delete('/order-details/:id',OrderDetailController.deleteOrderDetails)

    router.get('/brands',BrandController.getBrands)
    router.get('/brands/:id',BrandController.getBrandsBYID)
    router.post('/brands',BrandController.insertBrands)
    router.delete('/brands/:id',BrandController.deleteBrands)

    app.use('/api',router)
}
