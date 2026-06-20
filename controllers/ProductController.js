import db from "../models/index.js";
const { Op } = db.Sequelize;
import productPagination from "../utils/productPagination.js";

import InsertPorductReq from "../dtos/request/insertPorductReq.js";

const { getProductPagination, getTotalPage } = productPagination;

// Hàm lấy danh sách sản phẩm có hỗ trợ:
// 1. Tìm kiếm theo tên, mô tả hoặc thông số kỹ thuật.
// 2. Phân trang để mỗi lần chỉ trả về một phần dữ liệu.
export async function getProducts(req, res) {
  try {
    // Lấy dữ liệu từ query string.
    // Ví dụ: GET /products?search=iphone&page=1
    const { search = "", page = 1 } = req.query;
    const { currentPage, pageSize, offset } = getProductPagination({ page });

    // Số lượng sản phẩm trên mỗi trang.
    

    // Tính vị trí bắt đầu lấy dữ liệu trong database.
    // Trang 1 -> offset = 0
    // Trang 2 -> offset = 5
    // Trang 3 -> offset = 10
    

    // Điều kiện tìm kiếm mặc định: object rỗng nghĩa là lấy tất cả sản phẩm.
    let whereClause = {};

    // Nếu người dùng nhập từ khóa tìm kiếm thì lọc theo nhiều cột.
    if (search.trim() !== "") {
      whereClause = {
        [Op.or]: [
          // Tìm theo tên sản phẩm.
          {
            name: {
              [Op.like]: `%${search}%`,
            },
          },

          // Tìm theo mô tả sản phẩm.
          {
            description: {
              [Op.like]: `%${search}%`,
            },
          },

          // Tìm theo thông số kỹ thuật.
          {
            specification: {
              [Op.like]: `%${search}%`,
            },
          },
        ],
      };
    }

    // Chạy song song 2 truy vấn để tối ưu thời gian:
    // 1. findAll: lấy danh sách sản phẩm theo điều kiện tìm kiếm và phân trang.
    // 2. count: đếm tổng số sản phẩm thỏa điều kiện để tính tổng số trang.
    const [products, totalProducts] = await Promise.all([
      db.Product.findAll({
        where: whereClause,
        limit: pageSize,
        offset: offset,
      }),

      db.Product.count({
        where: whereClause,
      }),
    ]);

    // Trả kết quả về client, kèm thông tin trang hiện tại và tổng số trang.
    res.status(200).json({
      message: "Lấy danh sách sản phẩm thành công",
      currentPage: currentPage,
      totalPage: getTotalPage(totalProducts, pageSize),
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy danh sách sản phẩm",
      error: error.message,
    });
  }
}

export async function getProductsBYID(req, res) {
  const { id } = req.params;
  const product = await db.Product.findByPk(id);

  if (!product) {
    return res.status(404).json({
      message: "Không tìm thấy sản phẩm",
    });
  }

  res.status(200).json({
    data: product,
    message: "Lấy sản phẩm dựa trên id thành công",
  });
}

export async function insertProducts(req, res) {
  try {
    const productData = new InsertPorductReq(req.body);
    const existingProduct = await db.Product.findOne({
      where: {
        name: productData.name,
      },
    });

    if (existingProduct) {
      return res.status(409).json({
        message: "Tên sản phẩm đã tồn tại",
      });
    }

    const product = await db.Product.create(productData);

    res.status(201).json({
      message: "Thêm sản phẩm thành công",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi khi thêm mới sản phẩm",
      error: error.message,
    });
  }
}

export async function deleteProducts(req, res) {
  res.status(200).json({
    message: "Xóa sản phẩm thành công",
  });
}
