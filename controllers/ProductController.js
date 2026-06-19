import db from "../models/index.js"
import InsertPorductReq from "../dtos/request/insertPorductReq.js"

export async function getProducts(req,res)
{
    res.status(200).json(
    {
        message:'Lấy danh sách các sản phẩm thành công '
    })
}

export async function getProductsBYID(req,res)
{
    res.status(200).json(
    {
        message:'Lấy danh sách các sản phẩm dựa trên id '
    })
}

export async function insertProducts(req,res)
{
    try {
        const { error, value } = InsertPorductReq.validate(req.body) //truy xuất đối tượng bên trong của đối tượng

        if (error) {
            return res.status(400).json({
                message:"Dữ liệu sản phẩm không hợp lệ",
                error:error.details//nhả ra chi tiết lỗi
            });
        }

        const productData = new InsertPorductReq(value)
        const existingProduct = await db.Product.findOne({
            where: {
                name: productData.name
            }
        })

        if (existingProduct) {
            return res.status(409).json({
                message:"Tên sản phẩm đã tồn tại"
            });
        }

        const product = await db.Product.create(productData)

        res.status(201).json({
            message:"Thêm sản phẩm thành công ",
            data: product
        });
    } catch (error) {
       return  res.status(500).json({
            message:"Lỗi khi thêm mới sản phẩm",
            error:error.message
        });
    }
}

export async function deleteProducts(req,res)
{
    res.status(200).json(
    {
        message:'Xóa sản phẩm thành công '
    })
}
