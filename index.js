const path = require("path");
const cookieParser = require("cookie-parser");
const express = require("express");
// const router = express.Router();

const verifyJWT = require("./middleware/verifyJWT");

const app = express();
app.use(express.json());
app.use(/\/|index(.html)?/, (req, res) => res.send("APP"));

app.use("/demo", require("./router/subdir"));

// #region
// app.use("/gett", (req, res) => {
//   let data = "";
//   req.on("data", (chunk) => {
//     data += chunk;
//   });
//   req.on("end", () => {
//     console.log(JSON.parse(data));
//   });
//   res.sendStatus(200);
// });
// #endregion

app.use(cookieParser());

const assetPath = path.join(__dirname, "public");
app.use("/assets", express.static(assetPath));

app.use("/register", require("./router/api/register"));
app.use("/auth", require("./router/api/auth"));
app.use("/refresh", require("./router/api/refreshToken"));
app.use("/logout", require("./router/api/logout"));

app.use(verifyJWT);
app.use("/employees", require("./router/api/employees"));

// router
//   .route("/")
//   .get((req, res) => {
//     console.log(req.body);
//     res.json({ data: "Hello" });
//   })
//   .post((req, res) => res.json({ word: "Post" }));

// app.use("/get", express.json(), router);

// app.use('/get', require('./router/root'));

// app.use("/index", (req, res) => res.json({ name: "Hello" }));

// app.all("*", (req, res) => {
//   // res.status(404).sendFile(path.join(__dirname, "views", "404.html"))
//   // res.status(404);
//   // console.log(req.get('Accept'));
//   // console.log(req.accepts('application/json'));
//   // res.json({ result: "Not Allo" });
//   res.status(404);
//   if (req.accepts("html")) {
//     res.sendFile(path.join(__dirname, "views", "404.html"));
//   } else if (req.accepts("json")) {
//     res.json({ result: "404" });
//   } else {
//     res.type("txt").send("404");
//   }
// });

app.listen(8520, () => console.log("Server Starts"));
