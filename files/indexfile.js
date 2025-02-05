const express = require("express");
const path = require("path");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const port = 3000;

// Define schema
const projectschema = new mongoose.Schema({
    fname: String,
    lname: String,
    age: Number,
    gender: String,
    bloodgroup: String,
    phoneno1: String,
    phoneno2: String,
    address1: String,
    reason: String,
    Medical_History: String,
    registree_name: String,
    Your_realtion: String
});

// Define model
const Project = mongoose.model('Project', projectschema);

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/Project', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB:', err));

// Middleware
app.use(express.json());
app.use(express.static("files"));
app.use('/static', express.static("static"));
app.use(express.urlencoded({ extended: true })); // Updated line

// Routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "HTML_Files/index.html"));
});

app.post("/submit", (req, res) => {
    console.log("Received a POST request");  
    console.log("Headers:", req.headers);  
    console.log("Method:", req.method);  
    console.log("Body:", req.body);  

    res.send("POST request received!"); // Temporary response for debugging
});

// app.post("/", (req, res) => {
//     console.log(req.body); // Debugging
//     const userData = new Project(req.body);

//     userData.save()
//         .then(() => res.sendFile(path.join(__dirname, "HTML_Files/patient_section.html")))
//         .catch(err => {
//             console.error("Failed to save data:", err);
//             res.status(500).send("Internal Server Error");
//         });
// });

// Start server
app.listen(port, () => {
    console.log(`Server is started on port ${port}`);
});
