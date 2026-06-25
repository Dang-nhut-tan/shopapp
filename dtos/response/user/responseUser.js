import Joi from "joi";

class ResponseUser {
  constructor(data) {
    this.id = data.id;
    this.email = data.email;
    this.name = data.name;
    this.role = data.role;
    this.avatar = data.avatar;
    this.phone = data.phone;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }

  static validate(data) {
    const schema = Joi.object({
      id: Joi.number().integer().required(),
      email: Joi.string().email().required(),
      name: Joi.string().allow("").optional(),
      role: Joi.number().integer().optional(),
      avatar: Joi.string().allow("").optional(),
      phone: Joi.string().allow("").optional(),
      created_at: Joi.date().optional(),
      updated_at: Joi.date().optional(),
    });

    return schema.validate(data);
  }
}

export default ResponseUser;
