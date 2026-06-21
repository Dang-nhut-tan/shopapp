import db from "../models/index.js";
import InsertOrderReq from "../dtos/request/order/insertOrderReq.js";
import UpdateOrderReq from "../dtos/request/order/updateOrderReq.js";

export async function getOrders(req, res) {
  const orders = await db.Order.findAll();

  res.status(200).json({
    message: "Lấy danh sách đơn hàng thành công",
    data: orders,
  });
}

export async function getOrdersBYID(req, res) {
  const { id } = req.params;
  const order = await db.Order.findByPk(id);

  if (!order) {
    return res.status(404).json({
      message: "Không tìm thấy đơn hàng",
    });
  }

  res.status(200).json({
    message: "Lấy đơn hàng dựa trên id thành công",
    data: order,
  });
}

export async function insertOrders(req, res) {
  try {
    const orderData = new InsertOrderReq(req.body);
    const order = await db.Order.create(orderData);

    res.status(201).json({
      message: "Thêm đơn hàng thành công",
      data: order,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi khi thêm mới đơn hàng",
      error: error.message,
    });
  }
}

export async function updateOrders(req, res) {
  const { id } = req.params;
  const order = await db.Order.findByPk(id);

  if (!order) {
    return res.status(404).json({
      message: "Không tìm thấy đơn hàng",
    });
  }

  const orderData = new UpdateOrderReq(req.body);
  await order.update(orderData);

  res.status(200).json({
    message: "Cập nhật đơn hàng thành công",
    data: order,
  });
}

export async function deleteOrders(req, res) {
  const { id } = req.params;
  const order = await db.Order.findByPk(id);

  if (!order) {
    return res.status(404).json({
      message: "Không tìm thấy đơn hàng",
    });
  }

  await order.destroy();

  res.status(200).json({
    message: "Xóa đơn hàng thành công",
  });
}
