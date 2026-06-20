import db from "../models/index.js"
import InsertCategoryReq from "../dtos/request/insertCategoryReq.js"

export async function getCategories(req,res)
{
    res.status(200).json(
    {
        message:'Lấy danh sách các danh mục thành công '
    })
}

export async function getCategoriesBYID(req,res)
{
    res.status(200).json(
    {
        message:'Lấy danh sách các danh mục dựa trên id '
    })
}

export async function insertCategories(req,res)
{
    try {
        const categoryData = new InsertCategoryReq(req.body)
        const existingCategory = await db.Category.findOne({
            where: {
                name: categoryData.name
            }
        })

        if (existingCategory) {
            return res.status(409).json({
                message:"Tên danh mục đã tồn tại"
            });
        }

        const Category=await db.Category.create(categoryData)
        res.status(201).json({
            message:"Thêm danh mục thành công ",
            data: Category
        });
    } catch (error) {
        return res.status(500).json({
            message:"Lỗi khi thêm mới danh mục",
            error:error.message
        });
    }
}

export async function deleteCategories(req,res)
{
    res.status(200).json(
    {
        message:'Xóa danh mục thành công '
    })
}
