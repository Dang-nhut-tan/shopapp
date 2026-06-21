import db from "../models/index.js"
import InsertOrderDetailReq from "../dtos/request/orderDetail/insertOrderDetailReq.js"

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
    const orderDetailData = new InsertOrderDetailReq(req.body)
    const OrderDetail=await db.OrderDetail.create(orderDetailData)

    res.status(201).json({
        message:"Thêm chi tiết đơn hàng thành công ",
        data: OrderDetail
    });
}

export async function deleteOrderDetails(req,res)
{
    const { id } = req.params
    const orderDetail = await db.OrderDetail.findByPk(id)

    if (!orderDetail) {
        return res.status(404).json({
            message: "Khong tim thay chi tiet don hang"
        })
    }

    await orderDetail.destroy()

    res.status(200).json(
    {
        message:'Xóa chi tiết đơn hàng thành công '
    })
}
