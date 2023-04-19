import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import jwt from "jsonwebtoken";


const secret = "Mandlar";

const app = express();
const PORT = 4006;
app.use(cors());
app.use(bodyParser.json());

let users = [];
const accounts = [];
let userIds = 1;

app.post("/users", (req, res) => {
  const user = req.body;
  console.log("req body: " + user.username + " " + user.password);

  user.id = userIds++;

  users.push(user);

  const account = {
    money: "50000 $",
    userId: user.id,
  };
  accounts.push(account);

  console.log(user);

  res.statusCode = 200;
  res.send("ok");
});



function generateAccessToken(userId) {
  return jwt.sign(userId, secret);
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, secret, (err, userId) => {
    console.log(err);

    if (err) return res.sendStatus(403);

    req.userId = userId;

    next();
  });
}

//Logga in
app.post("/sessions", (req, res) => {
  const user = req.body;

  //Matchning av användarnamn
  const dbUser = users.find((u) => u.username == user.username);

  //Om lösenordet matchar skapas en "Token".
  if (dbUser != null && dbUser.password == user.password) {
    const token = generateAccessToken(dbUser.id);
    console.log("Made it!");
    res.json({ token });
  } else {
    console.log("Incorrect password or username", user, dbUser, users)
    res.status(401);
    res.json()
  }
});

app.get("/me/accounts", authenticateToken, (req, res) => {
  console.log("userId: ", req.userId);

  console.log(accounts);
  const dbAccount = accounts.find((a) => a.userId == req.userId);
  console.log(dbAccount);
  res.json(dbAccount);
  res.json({ userId: req.userId });
});


app.listen(PORT, () => {
  console.log("Server started on port" + PORT);
});
