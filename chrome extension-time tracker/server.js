const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

// Temporary storage (in-memory)
let data = [];

// Save time spent on websites
app.post("/save", (req, res) => {
    const { url, timeSpent, category } = req.body;
    data.push({ url, timeSpent, category, date: new Date() });
    res.send({ success: true });
});

// Get analytics (total time per site)
app.get("/analytics", (req, res) => {
    let result = {};
    data.forEach(d => {
        if (!result[d.url]) result[d.url] = { time: 0, category: d.category };
        result[d.url].time += d.timeSpent;
    });
    res.send(result);
});

// Start server
app.listen(3000, () => console.log("Server running on port 3000"));
