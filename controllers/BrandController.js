import db from "../models/index.js"
import InsertBrandReq from "../dtos/request/insertBrandReq.js"

export async function getBrands(req,res)
{
    res.status(200).json(
    {
        message:'Lấy danh sách các thương hiệu thành công '
    })
}

export async function getBrandsBYID(req,res)
{
    res.status(200).json(
    {
        message:'Lấy danh sách các thương hiệu dựa trên id '
    })
}

export async function insertBrands(req,res)
{
    try {
        const brandData = new InsertBrandReq(req.body)
        const existingBrand = await db.Brand.findOne({
            where: {
                name: brandData.name
            }
        })

        if (existingBrand) {
            return res.status(409).json({
                message:"Tên thương hiệu đã tồn tại"
            });
        }

        const Brand=await db.Brand.create(brandData)
        res.status(201).json({
            message:"Thêm thương hiệu thành công ",
            data: Brand
        });
    } catch (error) {
        return res.status(500).json({
            message:"Lỗi khi thêm mới thương hiệu",
            error:error.message
        });
    }
}

export async function deleteBrands(req,res)
{
    res.status(200).json(
    {
        message:'Xóa thương hiệu thành công '
    })
}
