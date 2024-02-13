const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
require("dotenv").config();
const multer = require("multer");
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./3-2/GES/Taslima%mam");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.q18ojdg.mongodb.net/edu-trio-dynamix?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Import socket.io
// const http = require("http").createServer(app);
// const io = require("socket.io")(http);

// // Socket.io connection handling
// io.on("connection", (socket) => {
//   console.log("User Online");

//   // Handle canvas-data event
//   socket.on("canvas-data", (data) => {
//     socket.broadcast.emit("canvas-data", data);
//   });
// });

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
    const projectCollection = client
      .db("edu-trio-dynamix")
      .collection("projects");
    const assignmentCollection = client
      .db("edu-trio-dynamix")
      .collection("assignment");
    const resourceCollection = client
      .db("edu-trio-dynamix")
      .collection("resource");
    const courseCollection = client.db("edu-trio-dynamix").collection("course");
    const applicationCollection = client
      .db("edu-trio-dynamix")
      .collection("application");
    const pdfCollection = client.db("edu-trio-dynamix").collection("pdf");

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

    //teacher get
    app.get("/teacher", async (req, res) => {
      const query = {};
      const cursor = teacherCollection.find(query);
      const teacher = await cursor.toArray();
      res.send(teacher);
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

    //student get
    app.get("/student", async (req, res) => {
      const query = {};
      const cursor = studentCollection.find(query);
      const student = await cursor.toArray();
      res.send(student);
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

    // teacher

    

    // Create project for teacher
    app.post("/teacher/project", async (req, res) => {
      try {
        const projectData = req.body;
        const result = await projectCollection.insertOne(projectData);
        if (result.insertedCount === 1) {
          res.status(201).json({ message: "Project added successfully" });
        } else {
          res.status(500).json({ message: "Failed to add project" });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
      }
    });

    ///teachers project get
    app.get("/teacher/project", async (req, res) => {
      const query = {};
      const cursor = projectCollection.find(query);
      const users = await cursor.toArray();
      res.send(users);
    });

    // Create assignment for teacher
    app.post("/teacher/assignment", async (req, res) => {
      try {
        const projectData = req.body;
        const result = await assignmentCollection.insertOne(projectData);
        if (result.insertedCount === 1) {
          res.status(201).json({ message: "Project added successfully" });
        } else {
          res.status(500).json({ message: "Failed to add project" });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
      }
    });

    ///teachers assignment get
    app.get("/teacher/assignment", async (req, res) => {
      const query = {};
      const cursor = assignmentCollection.find(query);
      const users = await cursor.toArray();
      res.send(users);
    });

    //  Create resource for teacher
    app.post("/teacher/resource", async (req, res) => {
      try {
        const { title, url, teacherName, teacherEmail } = req.body;
        const resource = { title, url, teacherName, teacherEmail };
        const result = await resourceCollection.insertOne(resource);
        if (result.insertedCount === 1) {
          res.status(201).json({ message: "Resource added successfully" });
        } else {
          res.status(500).json({ message: "Failed to add resource" });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
      }
    });

    // teachers resource get
    app.get("/teacher/resource", async (req, res) => {
      try {
        const query = {};
        const cursor = resourceCollection.find(query);
        const resources = await cursor.toArray();
        res.send(resources);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
      }
    });

    //  Create course for teacher
    app.post("/teacher/course", async (req, res) => {
      try {
        const courseData = req.body;
        const result = await courseCollection.insertOne(courseData);
        if (result.insertedCount === 1) {
          res.status(201).json({ message: "course added successfully" });
        } else {
          res.status(500).json({ message: "Failed to add course" });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
      }
    });

    ///teachers course get
    app.get("/teacher/course", async (req, res) => {
      try {
        const query = {};
        const cursor = courseCollection.find(query);
        const course = await cursor.toArray();
        res.send(course);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
      }
    });

    //student
    // Student applies for a course
    app.post("/student/course", async (req, res) => {
      try {
        const projectData = req.body;
        const result = await applicationCollection.insertOne(projectData);
        if (result.insertedCount === 1) {
          res.status(201).json({ message: "Project added successfully" });
        } else {
          res.status(500).json({ message: "Failed to add project" });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
      }
    });

    ///Student course get
    app.get("/student/course", async (req, res) => {
      try {
        const query = {};
        const cursor = applicationCollection.find(query);
        const course = await cursor.toArray();
        res.send(course);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
      }
    });
  } finally {
  }
}

run().catch(console.dir);

app.listen(port, () => {
  console.log(`server running on ${port}`);
});
