const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.q18ojdg.mongodb.net/edu-trio-dynamix?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    const teacherCollection = client
      .db("edu-trio-dynamix")
      .collection("teacher");
    const studentCollection = client
      .db("edu-trio-dynamix")
      .collection("student");
    const userCollection = client.db("edu-trio-dynamix").collection("user");

    // teacher post
    app.post("/teacher", async (req, res) => {
      const teacher = req.body;
      const result = await teacherCollection.insertOne(teacher);
      if (result.insertedCount === 1) {
        res.status(201).json({ message: "teacher added successfully" });
      } else {
        res.status(500).json({ message: "Failed to add teacher" });
      }
    });

    // student post
    app.post("/student", async (req, res) => {
      const student = req.body;
      const result = await studentCollection.insertOne(student);
      if (result.insertedCount === 1) {
        res.status(201).json({ message: "student added successfully" });
      } else {
        res.status(500).json({ message: "Failed to add student" });
      }
    });

    // user post
    app.post("/user", async (req, res) => {
      const user = req.body;
      const result = await userCollection.insertOne(user);
      if (result.insertedCount === 1) {
        res.status(201).json({ message: "user added successfully" });
      } else {
        res.status(500).json({ message: "Failed to add user" });
      }
    });

    //user get
    app.get("/user", async (req, res) => {
      const query = {};
      const cursor = userCollection.find(query);
      const users = await cursor.toArray();
      res.send(users);
    });
  } finally {
  }
}

run().catch(console.dir);

app.listen(port, () => {
  console.log(`server running on ${port}`);
});
