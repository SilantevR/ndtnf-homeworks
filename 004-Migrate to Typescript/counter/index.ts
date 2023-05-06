import express from "express";
import mongoose from "mongoose";
import Counter from "./models/count";

const app = express();
const PORT = Number(process.env.PORT) || 4000;

app.use(express.json());

app.post("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let book = await Counter.find({ book: id });

    if (book.length) {
      book[0].count++;
      await Counter.findOneAndUpdate({ book: id }, { count: book[0].count });
      book = await Counter.find({ book: id });
      res.status(200);
      res.json(book[0]);
    } else {
      const obj = await Counter.create({ book: id, count: 1 });
      res.status(200);
      res.json(obj);
    }
  } catch {
    res.status(500);
    res.json(false);
  }
});

app.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Counter.find({ book: id });

    if (book.length) {
      res.status(200);
      res.json(book[0]);
    } else {
      res.status(401);
      res.json(false);
    }
  } catch (err) {
    res.status(500);
    res.json(false);
  }
});

const baseURL = process.env.MONGODB_URL || `mongodb://localhost:27017/counters`;

mongoose
  .connect(baseURL)
  .then((res) => {
    console.log("conected to mongoDB");
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server is listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Conection failed: ${err}`);
  });
