require('dotenv').config();
const express = require("express");
const router = express.Router();
const request = require("request");

router.get("/", function(req,res) {
    const { searchTerm, startDate, endDate } = req.query;
    const apiKey = process.env.NYT_API_KEY;
  
    let queryUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${apiKey}&q=${searchTerm}`;
    if (startDate) queryUrl += `&begin_date=${startDate}`;
    if (endDate) queryUrl += `&end_date=${endDate}`;
    console.log(queryUrl);
  
    request(queryUrl, function(err,response,body) {
      if (err) {
        console.log(err + response);
        return res.json(err);
      };
      const rawJson = JSON.parse(body);
      const articleData = rawJson.response.docs.map(article => {
        return {
          title: article.headline.main,
          url: article.web_url,
          date: article.pub_date || "Not provided"
        };
      });
      res.json(articleData);
    });
});

module.exports = router;
