import Joi from "joi";

class UpdateProductReq {
  constructor(data) {
    this.name = data.name;
    this.price = data.price;
    this.oldprice = data.oldprice;
    this.image = data.image;
    this.description = data.description;
    this.specification = data.specification;
    this.buyturn = data.buyturn;
    this.quantity = data.quantity;
    this.brand_id = data.brand_id;
    this.category_id = data.category_id;
  }

  static validate(data) {
    const schema = Joi.object({
      name: Joi.string().optional(),
      price: Joi.number().min(0).empty("").optional(),
      oldprice: Joi.number().min(0).empty("").optional(),
      image: Joi.string().uri().allow("").optional(),
      description: Joi.string().optional(),
      specification: Joi.string().optional(),
      buyturn: Joi.number().integer().min(0).empty("").optional(),
      quantity: Joi.number().integer().min(0).empty("").optional(),
      brand_id: Joi.number().integer().optional(),
      category_id: Joi.number().integer().optional(),
    }).min(1);

    return schema.validate(data);
  }
}

export default UpdateProductReq;
