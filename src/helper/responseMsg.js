
require("dotenv").config();

let successResponse = (
  req,
  res,
  data,
  message = "success",
  code = 200
) =>
 {
  console.log(data,"final response data to server api ")
  res.setHeader('Content-Type', 'application/json; charset=utf-8'),
  res.send(
    encrypt({
      code,
      data,
      message,
      success: true,
    })
  );
 }
let errorResponse = (
  req,
  res,
  message = "Something went wrong",
  code = 500,
  error = {}
) =>
{
  res.setHeader('Content-Type', 'application/json; charset=utf-8'),
  res.status(code).json(
    encrypt({
      code,
      message,
      error,
      data: null,
      success: false,
    })
  );
}
const validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const validateFields = (object, fields) => {
  const errors = [];
  fields.forEach((f) => {
    if (!(object && object[f])) {
      errors.push(f);
    }
  });
  return errors.length ? `${errors.join(", ")} are required fields.` : "";
};

const uniqueId = (length = 13) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const encrypt = (data) => {
    return data;
};


module.exports = {
  successResponse,errorResponse,validateEmail,validateFields,uniqueId
};