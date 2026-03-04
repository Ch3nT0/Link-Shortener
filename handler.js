const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand, GetCommand } = require("@aws-sdk/lib-dynamodb");
const { nanoid } = require("nanoid");

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);
const TABLE_NAME = process.env.TABLE_NAME;

// 1. Hàm rút gọn URL
module.exports.shorten = async (event) => {
  const { longUrl } = JSON.parse(event.body);
  const shortCode = nanoid(7); // Tạo mã ngẫu nhiên 7 ký tự

  await docClient.send(new PutCommand({
    TableName: TABLE_NAME,
    Item: { shortCode, longUrl, createdAt: Date.now() },
  }));

  return {
    statusCode: 200,
    body: JSON.stringify({ shortUrl: `https://${event.headers.Host}/dev/${shortCode}` }),
  };
};

// 2. Hàm điều hướng (Redirect)
module.exports.redirect = async (event) => {
  const shortCode = event.pathParameters.shortCode;

  const { Item } = await docClient.send(new GetCommand({
    TableName: TABLE_NAME,
    Key: { shortCode },
  }));

  if (!Item) return { statusCode: 404, body: "URL not found" };

  return {
    statusCode: 301,
    headers: { Location: Item.longUrl },
  };
};