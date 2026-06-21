import db from "../models/index.js";
const { Op } = db.Sequelize;// Toán tử Sequelize dùng cho điều kiện truy vấn (LIKE, OR, IN, ...)
import productPagination from "../utils/productPagination.js";

import InsertPorductReq from "../dtos/request/product/insertPorductReq.js";
import UpdateProductReq from "../dtos/request/product/updateProductReq.js";

const { getProductPagination, getTotalPage } = productPagination;

export async function getProducts(req, res) {
  try {
    const { search = "", page = 1 } = req.query;
    const { currentPage, pageSize, offset } = getProductPagination({ page });

    let whereClause = {};

    if (search.trim() !== "") {
      whereClause = {
        [Op.or]: [
          {
            name: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            description: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            specification: {
              [Op.like]: `%${search}%`,
            },
          },
        ],
      };
    }

    const [products, totalProducts] = await Promise.all([
      db.Product.findAll({
        where: whereClause,
        limit: pageSize,
        offset,
      }),
      db.Product.count({
        where: whereClause,
      }),
    ]);

    res.status(200).json({
      message: "Lấy danh sách sản phẩm thành công",
      currentPage,
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
  const { id } = req.params;//req.params là nơi chứa các tham số trên URL (Route Parameters) trong ExpressJS.
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

export async function updateProducts(req, res) {
  const { id } = req.params;
  const product = await db.Product.findByPk(id);

  if (!product) {
    return res.status(404).json({
      message: "Không tìm thấy sản phẩm",
    });
  }

  const productData = new UpdateProductReq(req.body);
  if (productData.name) {
  const existingProduct = await db.Product.findOne({
    where: {
      name: productData.name,
      id: {
        [Op.ne]: id,
      },
    },
  });

  if (existingProduct) {
    return res.status(409).json({
      message: "Tên sản phẩm đã tồn tại",
    });
  }

  }

  await product.update(productData);

  res.status(200).json({
    message: "Cập nhật sản phẩm thành công",
    data: product,
  });
}

export async function deleteProducts(req, res) {
  const { id } = req.params;
  const product = await db.Product.findByPk(id);

  if (!product) {
    return res.status(404).json({
      message: "Không tìm thấy sản phẩm",
    });
  }

  await product.destroy();

  res.status(200).json({
    message: "Xóa sản phẩm thành công",
  });
}
