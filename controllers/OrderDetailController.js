import db from "../models/index.js"
import InsertOrderDetailReq from "../dtos/request/insertOrderDetailReq.js"

export async function getOrderDetails(req,res)
{
    res.status(200).json(
    {
        message:'Lấy danh sách các chi tiết đơn hàng thành công '
    })
}

export async function getOrderDetailsBYID(req,res)
{
    res.status(200).json(
    {
        message:'Lấy danh sách các chi tiết đơn hàng dựa trên id '
    })
}

export async function insertOrderDetails(req,res)
{
    try {
        const { error, value } = InsertOrderDetailReq.validate(req.body)

        if (error) {
            return res.status(400).json({
                message:"Dữ liệu chi tiết đơn hàng không hợp lệ",
                error:error.details
            });
        }

        const orderDetailData = new InsertOrderDetailReq(value)
        const OrderDetail=await db.OrderDetail.create(orderDetailData)

        res.status(201).json({
            message:"Thêm chi tiết đơn hàng thành công ",
            data: OrderDetail
        });
    } catch (error) {
        return res.status(500).json({
            message:"Lỗi khi thêm mới chi tiết đơn hàng",
            error:error.message
        });
    }
}

export async function deleteOrderDetails(req,res)
{
    res.status(200).json(
    {
        message:'Xóa chi tiết đơn hàng thành công '
    })
}
