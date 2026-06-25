import db from "../models/index.js";
const { Op } = db.Sequelize;
import userPagination from "../utils/userPagination.js";

import InsertUserReq from "../dtos/request/user/insertUserReq.js";
import UpdateUserReq from "../dtos/request/user/updateUserReq.js";
import ResponseUser from "../dtos/response/user/responseUser.js";

const { getUserPagination, getTotalPage } = userPagination;

export async function getUsers(req, res) {
  const { search = "", page = 1 } = req.query;
  const { currentPage, pageSize, offset } = getUserPagination({ page });

  let whereClause = {};

  if (search.trim() !== "") {
    whereClause = {
      [Op.or]: [
        {
          email: {
            [Op.like]: `%${search}%`,
          },
        },
        {
          name: {
            [Op.like]: `%${search}%`,
          },
        },
        {
          phone: {
            [Op.like]: `%${search}%`,
          },
        },
      ],
    };
  }

  const [users, totalUsers] = await Promise.all([
    db.User.findAll({
      where: whereClause,
      limit: pageSize,
      offset,
    }),
    db.User.count({
      where: whereClause,
    }),
  ]);

  res.status(200).json({
    message: "Lấy danh sách user thành công",
    currentPage,
    totalPage: getTotalPage(totalUsers, pageSize),
    data: users.map((user) => new ResponseUser(user)),
  });
}

export async function getUsersBYID(req, res) {
  const { id } = req.params;
  const user = await db.User.findByPk(id);

  if (!user) {
    return res.status(404).json({
      message: "Không tìm thấy user",
    });
  }

  res.status(200).json({
    message: "Lấy user dựa trên id thành công",
    data: new ResponseUser(user),
  });
}

export async function insertUsers(req, res) {
  const userData = new InsertUserReq(req.body);
  const existingUser = await db.User.findOne({
    where: {
      email: userData.email,
    },
  });

  if (existingUser) {
    return res.status(409).json({
      message: "Email đã tồn tại",
    });
  }

  const user = await db.User.create(userData);

  res.status(201).json({
    message: "Thêm user thành công",
    data: new ResponseUser(user),
  });
}

export async function updateUsers(req, res) {
  const { id } = req.params;
  const user = await db.User.findByPk(id);

  if (!user) {
    return res.status(404).json({
      message: "Không tìm thấy user",
    });
  }

  const userData = new UpdateUserReq(req.body);

  if (userData.email) {
    const existingUser = await db.User.findOne({
      where: {
        email: userData.email,
        id: {
          [Op.ne]: id,
        },
      },
    });

    if (existingUser) {
      return res.status(409).json({
        message: "Email đã tồn tại",
      });
    }
  }

  await user.update(userData);

  res.status(200).json({
    message: "Cập nhật user thành công",
    data: new ResponseUser(user),
  });
}

export async function deleteUsers(req, res) {
  const { id } = req.params;
  const user = await db.User.findByPk(id);

  if (!user) {
    return res.status(404).json({
      message: "Không tìm thấy user",
    });
  }

  await user.destroy();

  res.status(200).json({
    message: "Xóa user thành công",
  });
}
