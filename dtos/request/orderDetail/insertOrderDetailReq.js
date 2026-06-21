import Joi from "joi";

class InsertOrderDetailReq {
  constructor(data) {
    this.order_id = data.order_id;
    this.product_id = data.product_id;
    this.price = data.price;
    this.quantity = data.quantity;
  }

  static validate(data) {
    const schema = Joi.object({
      order_id: Joi.number().integer().required(),
      product_id: Joi.number().integer().required(),
      price: Joi.number().min(0).empty("").default(0),
      quantity: Joi.number().integer().min(0).empty("").default(0),
    });

    return schema.validate(data);
  }
}

export default InsertOrderDetailReq;
