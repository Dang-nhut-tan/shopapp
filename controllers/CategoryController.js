import db from "../models/index.js";
const { Op } = db.Sequelize;
import pagination from "../utils/productPagination.js";

import InsertCategoryReq from "../dtos/request/category/insertCategoryReq.js";
import UpdateCategoryReq from "../dtos/request/category/updateCategoryReq.js";

const { getProductPagination, getTotalPage } = pagination;

export async function getCategories(req, res) {
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

    const [categories, totalCategories] = await Promise.all([
      db.Category.findAll({
        where: whereClause,
        limit: pageSize,
        offset,
      }),
      db.Category.count({
        where: whereClause,
      }),
    ]);

    res.status(200).json({
      message: "Lấy danh sách danh mục thành công",
      currentPage,
      totalPage: getTotalPage(totalCategories, pageSize),
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy danh sách danh mục",
      error: error.message,
    });
  }
}

export async function getCategoriesBYID(req, res) {
  const { id } = req.params;
  const category = await db.Category.findByPk(id);

  if (!category) {
    return res.status(404).json({
      message: "Không tìm thấy danh mục",
    });
  }

  res.status(200).json({
    data: category,
    message: "Lấy danh mục dựa trên id thành công",
  });
}

export async function insertCategories(req, res) {
  try {
    const categoryData = new InsertCategoryReq(req.body);
    const existingCategory = await db.Category.findOne({
      where: {
        name: categoryData.name,
      },
    });

    if (existingCategory) {
      return res.status(409).json({
        message: "Tên danh mục đã tồn tại",
      });
    }

    const category = await db.Category.create(categoryData);
    res.status(201).json({
      message: "Thêm danh mục thành công",
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi khi thêm mới danh mục",
      error: error.message,
    });
  }
}

export async function updateCategories(req, res) {
  const { id } = req.params;
  const category = await db.Category.findByPk(id);

  if (!category) {
    return res.status(404).json({
      message: "KhÃ´ng tÃ¬m tháº¥y danh má»¥c",
    });
  }

  const categoryData = new UpdateCategoryReq(req.body);

  if (categoryData.name) {
    const existingCategory = await db.Category.findOne({
      where: {
        name: categoryData.name,
        id: {
          [Op.ne]: id,
        },
      },
    });

    if (existingCategory) {
      return res.status(409).json({
        message: "TÃªn danh má»¥c Ä‘Ã£ tá»“n táº¡i",
      });
    }
  }

  await category.update(categoryData);

  res.status(200).json({
    message: "Cáº­p nháº­t danh má»¥c thÃ nh cÃ´ng",
    data: category,
  });
}

export async function deleteCategories(req, res) {
  const { id } = req.params;
  const category = await db.Category.findByPk(id);

  if (!category) {
    return res.status(404).json({
      message: "Khong tim thay danh muc",
    });
  }

  await category.destroy();

  res.status(200).json({
    message: "Xóa danh mục thành công",
  });
}
