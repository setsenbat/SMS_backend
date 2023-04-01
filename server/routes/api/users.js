const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const pptr = require("puppeteer");

// Web scraper
router.get("/scrapeweb", async (req, res, next) => {
  // Эхлээд json bol json tegeed авторизаци шалгах
  try {
    let browser = await pptr.launch({
      headless: false,
      defaultViewport: null,
    });
    let page = await browser.newPage();

    // let url = "http://citi.edu.mn/frequently-asked-questions/"; // mn
    // let url = "http://citi.edu.mn/en/frequently-asked-questions-2/"; // en

    // let url = " http://citi.edu.mn/cn/frequently-asked-questions-chn/"; // cn

    // let url = "http://citi.edu.mn/departments/"; // cn


    let url = "http://citi.edu.mn/citi-gallery/";

    await page.goto(url, {
      waitUntil: "domcontentloaded",
    });

    // await page.screenshot({path: 'example.png'})

    let text = await page.evaluate(() => {
      return new Promise((resolve, reject) => {
        // document.body.innerText
        try {
          const quoteList = document.querySelectorAll(".vce-faq-group-item");
          // Fetch the sub-elements from the previously fetched quote element
          // Get the displayed text and return it (`.innerText`)
          let arr = [];
          Array.from(quoteList).forEach((quote, index) => {
            // Fetch the sub-elements from the previously fetched quote element
            // Get the displayed text and return it (`.innerText`)
            const question = quote.querySelector(
              ".vce-faq-group-item-heading-title"
            ).innerText;
            const answer = quote.querySelector(
              ".vce-faq-group-item-content"
            ).innerText;
            arr.push({ question, answer });
            if (index + 1 === Array.from(quoteList).length) {
              resolve(arr);
            }
          });
        } catch (error) {
          reject(error);
        }
      });
    });

    await browser.close();
    res.json(text);
    next();
  } catch (err) {
    return next(err);
  }
});

async function scraper() {
  let url = "http://167.99.129.50/2021/03/20/accountant-2/";
  try {
    let browser = await pptr.launch({
      headless: false,
      defaultViewport: null,
    });
    let page = await browser.newPage();

    await page.goto(url, {
      waitUntil: "domcontentloaded",
    });

    // await page.screenshot({path: 'example.png'})

    let text = await page.evaluate(() => {
      return new Promise((resolve, reject) => {
        // document.body.innerText
        try {
          const quoteList = document.querySelectorAll(".vce-faq-group-item");
          // Fetch the sub-elements from the previously fetched quote element
          // Get the displayed text and return it (`.innerText`)
          let arr = [];
          Array.from(quoteList).forEach((quote, index) => {
            // Fetch the sub-elements from the previously fetched quote element
            // Get the displayed text and return it (`.innerText`)
            const question = quote.querySelector(
              ".vce-faq-group-item-heading-title"
            ).innerText;
            const answer = quote.querySelector(
              ".vce-faq-group-item-content"
            ).innerText;
            arr.push({ question, answer });
            if (index + 1 === Array.from(quoteList).length) {
              resolve(arr);
            }
          });
        } catch (error) {
          reject(error);
        }
      });
    });

    await browser.close();
    res.json(text);
    next();
  } catch (err) {
    return next(err);
  }
}

module.exports = router;
