const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})

export default async function (req, res) {
  const body = JSON.parse(req.body);
  const value = await cloudinary.search
    .expression(body.expression)
    .execute().then(result => result);

  return res.status(200).send(JSON.stringify(value))
}