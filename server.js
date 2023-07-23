const express = require("express");
const cors = require("cors");
const app = express();
const axios = require("axios");

app.use(express.json());

app.use(cors());
require('dotenv').config();

app.get("/", (req, res) => {
    res.send("Hello there!")
})

app.post("/api/khalti-payment", async (req, res) => {
    const payload = req.body;
    console.log(process.env.KHALTI_SECRET_KEY);
    const khaltiResponse = await axios.post(
        "https://a.khalti.com/api/v2/epayment/initiate/",
        payload,
        {
            headers: {
                Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
            }
        }
    );

    if (khaltiResponse) {

        return res.json({
            success: true,
            data: khaltiResponse.data
        })
    } else {
        res.json({
            success: false,
            message: 'something went wrong'
        })
    }


})

const PORT = process.env.PORT || 8000

app.listen(PORT, () => console.log(`Server listening on ${PORT}`))
