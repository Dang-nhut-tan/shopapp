import Joi from "joi";

class InsertOrderReq {
  constructor(data) {
    this.user_id = data.user_id;
    this.status = data.status;
    this.note = data.note;
    this.total = data.total;
  }

  static validate(data) {
    const schema = Joi.object({
      user_id: Joi.number().integer().required(),
      status: Joi.number().integer().min(0).empty("").default(0),
      note: Joi.string().allow("").optional(),
      total: Joi.number().min(0).empty("").default(0),
    });

    return schema.validate(data);
  }
}

export default InsertOrderReq;
