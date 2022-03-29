const express = require("express");
const mongoose = require("mongoose");
const address = require("./models/addressModel");
const student = require("./models/studentModel");
const dotenv = require("dotenv");
dotenv.config({
    path: "./config.env",
  });
const app = express();
app.use(express.json());

mongoose
	.connect(process.env.MONGO_URI,
		{
			useNewUrlParser: true,
		}
	)
	.then(() => console.log("Connected to MongoDB"));


app.get("/", (_req, res) => {
    res.send("Populate");
});

app.get("/students", async (_req, res) => {
	const students = await student.find();

	res.json(students);
});
app.get("/students/:studentId", async (req, res) => {
    const students = await student.findById(req.params.studentId).populate(
    "address"
);
    res.json(students);
});

app.post("/students", async (req, res) => {
    await student.create(req.body);
    res.status(201).send("Student created");
});
    
app.post("/students/:studentId/address", async (req, res) => {
    const addresse = await address.create(req.body);
    await student.findByIdAndUpdate(req.params.studentId, {
    $push: { address: addresse._id },
});
    res.status(201).send("Address created");
});
    
app.use("*", (err, req, res, next) => {
    res.send("error");
});

app.listen(8000, () => {
    console.log("Listening on port 8000");
});