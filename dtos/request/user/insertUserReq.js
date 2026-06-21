import Joi from "joi";

class InsertUserReq {
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
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      name: Joi.string().required(),
      role: Joi.number().integer().empty("").default(0),
      avatar: Joi.string().allow("").optional(),
      phone: Joi.string().allow("").optional(),
    });

    return schema.validate(data);
  }
}

export default InsertUserReq;
