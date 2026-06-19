import db from "../models/index.js"
import InsertOrderReq from "../dtos/request/insertOrderReq.js"

export async function getOrders(req,res)
{
    res.status(200).json(
    {
        message:'Lấy danh sách các đơn hàng thành công '
    })
}

export async function getOrdersBYID(req,res)
{
    res.status(200).json(
    {
        message:'Lấy danh sách các đơn hàng dựa trên id '
    })
}

export async function insertOrders(req,res)
{
    try {
        const { error, value } = InsertOrderReq.validate(req.body)

        if (error) {
            return res.status(400).json({
                message:"Dữ liệu đơn hàng không hợp lệ",
                error:error.details
            });
        }

        const orderData = new InsertOrderReq(value)
        const Order=await db.Order.create(orderData)

        res.status(201).json({
            message:"Thêm đơn hàng thành công ",
            data: Order
        });
    } catch (error) {
        return res.status(500).json({
            message:"Lỗi khi thêm mới đơn hàng",
            error:error.message
        });
    }
}

export async function deleteOrders(req,res)
{
    res.status(200).json(
    {
        message:'Xóa đơn hàng thành công '
    })
}
