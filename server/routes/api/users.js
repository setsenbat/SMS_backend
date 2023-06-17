const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const pptr = require("puppeteer");
const moment = require("moment-timezone");

// Web scraper
router.get("/scrapeweb", async (req, res, next) => {
  // Эхлээд json bol json tegeed авторизаци шалгах

  try {
    // let reply = await scrape();
    let reply = await hemis();
    res.json(reply);
    next();
  } catch (error) {
    console.log(error);
  }
});

async function scrape() {
  try {
    let browser = await pptr.launch({
      headless: false,
      defaultViewport: null,
    });
    let page = await browser.newPage();

    // let url = "http://citi.edu.mn/frequently-asked-questions/"; // mn
    // let url = "http://citi.edu.mn/en/frequently-asked-questions-2/"; // en

    // let url = " http://citi.edu.mn/cn/frequently-asked-questions-chn/"; // cn

    let url = "https://citi.edu.mn"; // cn

    // let url = "http://citi.edu.mn/citi-gallery/";

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
    return text;
  } catch (err) {
    return err;
  }
}

async function scraper() {
  const browser = await pptr.launch({
    headless: false,
    defaultViewport: null,
  });
  const page = await browser.newPage();

  // let url = "http://167.99.129.50/2021/04/13/business-administration-f/"
  let url = "http://167.99.129.50/2021/03/20/accountant-2/";

  await page.goto(url, {
    waitUntil: "domcontentloaded",
  });

  const courseTable = await page.$(".small-16.columns table");
  console.log(courseTable);
  const courseData = await courseTable.evaluate((table) => {
    let tble = table.querySelectorAll("tbody tr");
    return new Promise((resolve, reject) => {
      let arr = [];
      Array.from(tble).forEach((tbl, index) => {
        console.log(tbl, "dafaq");
        arr.push(tbl.innerText);
        if (index + 1 === Array.from(tble).length) {
          resolve(arr);
        }
      });
      // return courseRows.map((row) => {
      //   const [courseCode, courseDescription] = row.querySelectorAll('.course-description');
      //   // console.log(row.innerHTML)
      //   // return {
      //   //   course: courseCode.textContent.trim(),
      //   //   description: courseDescription.textContent.trim(),
      //   //   credit: row.querySelector('.nowrap').textContent.trim(),
      //   // };
      //   return row
      // });
    });
  });

  console.log(courseData, "dafaqqqq");

  await browser.close();
}

async function hemis() {
  try {
    let browser = await pptr.launch({
      headless: false,
      defaultViewport: null,
    });
    let page = await browser.newPage();

    console.log("Navigating to the login page...");
    await page.goto("https://hemis.edu.mn/hub/login.html", {
      waitUntil: "domcontentloaded",
    });

    console.log("Waiting for the page to load...");
    // await page.waitForNavigation(); // Wait for the page to finish loading
    setTimeout(async () => {
      // Fill in the login form
      console.log("Filling in the login form...");
      await page.type("#j_username", "es3610657492");
      await page.type("#j_password", "96967100");

      console.log("Submitting the form...");
      // Submit the form
      setTimeout(async () => {
        await Promise.all([
          page.waitForNavigation(),
          page.click('button[name="submit"]'),
        ]);
      }, 2000);
      console.log("Waiting for page to load2...");
      setTimeout(async () => {
        await page.goto("https://hemis.edu.mn/hub", {
          waitUntil: "domcontentloaded",
        });
        // Get the page content
        console.log("Getting the page content...");
        const pageContent = await page.evaluate(() => {
          return document.documentElement.innerHTML;
        });

        // console.log("Page content:", pageContent);

        // Close the browser
        await browser.close();
      }, 20000);
    }, 2000);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

module.exports = router;
