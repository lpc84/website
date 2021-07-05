module.exports = async function return200JSON(event, context) {
  return { statusCode: 200, body: JSON.stringify({ message: "Hello World" }) };
};
