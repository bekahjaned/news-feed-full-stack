const express = require("express");
const router = express.Router();
const fetch = require('node-fetch');
require('dotenv').config();

router.get("/", async (req, res, next) => {
    const api_key = process.env.API_KEY;
    const news_url = `https://api.nytimes.com/svc/news/v3/content/all/all.json?page=50&api-key=${api_key}`
    const news_response = await fetch(news_url);
    const news_data = await news_response.json();

    res.send(news_data)
});

module.exports = router;