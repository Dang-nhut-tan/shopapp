import Joi from "joi";

class UpdateUserReq {
  constructor(data) {
    this.email = data.email;
    this.password = data.password;
    this.name = data.name;
    this.role = data.role;
    this.avatar = data.avatar;
    this.phone = data.phone;
  }

  static validate(data) {
    const schema = Joi.object({
      email: Joi.string().email().optional(),
      password: Joi.string().optional(),
      name: Joi.string().optional(),
      role: Joi.number().integer().empty("").optional(),
      avatar: Joi.string().allow("").optional(),
      phone: Joi.string().allow("").optional(),
    }).min(1);

    return schema.validate(data);
  }
}

export default UpdateUserReq;
