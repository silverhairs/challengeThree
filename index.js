import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();

app.get("/", (req, res) => {
  res.send({ status: success, msg: "Hey" });
});

app.get("/:id", cors(), (req, res) => {
  fetch(`https://jsonplaceholder.typicode.com/albums/${req.params.id}/photos`)
    .then((response) => {
      if (!response.ok) {
        res.status(404).json({
          success: false,
          msg: "Not found",
        });
      }
      return response.json();
    })
    .then((data) => res.send(data))
    .catch((e) => res.status(400).json());
});
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: "GET",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
app.listen(process.env.PORT || 5000, () => {});
