const express = require('express');
const { connectDb } = require('./config/dbConnection.js');
const process = require('dotenv').config();
const cors = require('cors');
const Data = require('./models/Data.js');
const app = express();
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: false }))
connectDb();

app.get("/", async (req, res) => {

    try {
        let obj = req.query;
        const updatedObject = {};
        Object.keys(obj).forEach(key => {
            let value = obj[key];
            if (/^\d*$/.test(value)) {
                updatedObject[key] = Number(value)
            }
            else {
                updatedObject[key] = value;
            }
        })
        console.log(updatedObject);
        console.log(+" " + typeof updatedObject['start_year'])
        const data = await Data.find({...updatedObject});
        console.log(data);
        res.status(200).send({ "status": "success", "length": data.length, "data": data });
    }
    catch (err) {
        console.error(err);
    }






});

const port = 8000;

app.listen(port, () => {
    console.log(`listening on  http://localhost:${port}`);
});