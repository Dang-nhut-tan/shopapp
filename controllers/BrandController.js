import db from "../models/index.js";
const { Op } = db.Sequelize;
import pagination from "../utils/productPagination.js";

import InsertBrandReq from "../dtos/request/brand/insertBrandReq.js";
import UpdateBrandReq from "../dtos/request/brand/updateBrandReq.js";

const { getProductPagination, getTotalPage } = pagination;

export async function getBrands(req, res) {
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
}

export async function updateBrands(req, res) {
  const { id } = req.params;
  const brand = await db.Brand.findByPk(id);

  if (!brand) {
    return res.status(404).json({
      message: "KhÃ´ng tÃ¬m tháº¥y thÆ°Æ¡ng hiá»‡u",
    });
  }

  const brandData = new UpdateBrandReq(req.body);

  if (brandData.name) {
    const existingBrand = await db.Brand.findOne({
      where: {
        name: brandData.name,
        id: {
          [Op.ne]: id,
        },
      },
    });

    if (existingBrand) {
      return res.status(409).json({
        message: "TÃªn thÆ°Æ¡ng hiá»‡u Ä‘Ã£ tá»“n táº¡i",
      });
    }
  }

  await brand.update(brandData);

  res.status(200).json({
    message: "Cáº­p nháº­t thÆ°Æ¡ng hiá»‡u thÃ nh cÃ´ng",
    data: brand,
  });
}

export async function deleteBrands(req, res) {
  const { id } = req.params;
  const brand = await db.Brand.findByPk(id);

  if (!brand) {
    return res.status(404).json({
      message: "Khong tim thay thuong hieu",
    });
  }

  await brand.destroy();

  res.status(200).json({
    message: "Xóa thương hiệu thành công",
  });
}
