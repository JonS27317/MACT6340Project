
import express from 'express';
import dotenv from "dotenv";
//this is why case is important
import * as utils from "./Utils/utils.js"
import cors from "cors";

dotenv.config();
import * as db from './Utils/database.js';
let data = ["Project 1", "Project 2", "Project 3"];
let projects = [];

const app = express();
app.use(cors());

const port = process.env.port || 3000;

app.set("view engine", "ejs")
app.use(express.json());
app.use(express.static('public'));


app.get('/', async (req, res, next) => {
    await db.connect()
        .then(async () => {
            //query the database for the project records
            projects = await db.getAllProjects();
            console.log(projects);  //print db data into the console
            let featuredRand = Math.floor(Math.random() * projects.length);
            res.render("index.ejs", { projectArray: projects, featuredProject: projects[featuredRand] });
        })
        .catch(next);
});


app.get("/project/:id", (req, res) => {
    let id = req.params.id;
    if (id > projects.length) {
        throw new Error("No project with that ID");
    }
    res.render("project.ejs", { project: projects[id - 1], which: id });
});

app.get('/projects', async (req, res) => {
    res.render("projects.ejs", { projectArray: projects });
});

app.get('/contact', (req, res) => {
    res.render("contact.ejs")
});

app.post("/mail", async (req, res) => {
    await utils
        .sendMessage(req.body.sub, req.body.txt)
        .then(() => {
            res.send({ result: "success" });
        })
        .catch(() => {
            res.send({ result: "failure" });
        });
});

app.use((err, req, res, next) => {
    console.log(err);
    res.render("error.ejs");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});