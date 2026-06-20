import db from "../models/index.js";
const { Op } = db.Sequelize;
import pagination from "../utils/productPagination.js";

import InsertBrandReq from "../dtos/request/insertBrandReq.js";

const { getProductPagination, getTotalPage } = pagination;

export async function getBrands(req, res) {
  try {
    const { search = "", page = 1 } = req.query;
    const { currentPage, pageSize, offset } = getProductPagination({ page });

    let whereClause = {};

    if (search.trim() !== "") {
      whereClause = {
        name: {
          [Op.like]: `%${search}%`,
        },
      };
    }

    const [brands, totalBrands] = await Promise.all([
      db.Brand.findAll({
        where: whereClause,
        limit: pageSize,
        offset,
      }),
      db.Brand.count({
        where: whereClause,
      }),
    ]);

    res.status(200).json({
      message: "Lấy danh sách thương hiệu thành công",
      currentPage,
      totalPage: getTotalPage(totalBrands, pageSize),
      data: brands,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy danh sách thương hiệu",
      error: error.message,
    });
  }
}

export async function getBrandsBYID(req, res) {
  const { id } = req.params;
  const brand = await db.Brand.findByPk(id);

  if (!brand) {
    return res.status(404).json({
      message: "Không tìm thấy thương hiệu",
    });
  }

  res.status(200).json({
    data: brand,
    message: "Lấy thương hiệu dựa trên id thành công",
  });
}

export async function insertBrands(req, res) {
  try {
    const brandData = new InsertBrandReq(req.body);
    const existingBrand = await db.Brand.findOne({
      where: {
        name: brandData.name,
      },
    });

    if (existingBrand) {
      return res.status(409).json({
        message: "Tên thương hiệu đã tồn tại",
      });
    }

    const brand = await db.Brand.create(brandData);
    res.status(201).json({
      message: "Thêm thương hiệu thành công",
      data: brand,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi khi thêm mới thương hiệu",
      error: error.message,
    });
  }
}

export async function deleteBrands(req, res) {
  res.status(200).json({
    message: "Xóa thương hiệu thành công",
  });
}
