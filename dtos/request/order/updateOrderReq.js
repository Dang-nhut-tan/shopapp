import Joi from "joi";

class UpdateOrderReq {
  constructor(data) {
    this.user_id = data.user_id;
    this.status = data.status;
    this.note = data.note;
    this.total = data.total;
  }

  static validate(data) {
    const schema = Joi.object({
      user_id: Joi.number().integer().optional(),
      status: Joi.number().integer().min(0).empty("").optional(),
      note: Joi.string().allow("").optional(),
      total: Joi.number().min(0).empty("").optional(),
    }).min(1);

    return schema.validate(data);
  }
}

export default UpdateOrderReq;
