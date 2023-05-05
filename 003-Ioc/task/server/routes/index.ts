import express from "express";
import path from "path";
import http from "http";
import { BookModel as Book } from "../models/book";
import fileMulter from "../middlewares/books";
import coverMulter from "../middlewares/covers";
import { PostOptions, Obj } from "../types";
import { BookRepository } from "../bookRepository";
import { container } from "../container";

const router = express.Router();

const URL = process.env.URL || "http://localhost:4000/";

const repo = container.get(BookRepository);

function httpGet(URL: string) {
  return new Promise((resolve, reject) => {
    http
      .get(URL, (res) => {
        let rowData = "";
        res.setEncoding("utf8");
        res.on("data", (chunk) => (rowData += chunk));
        res.on("end", () => {
          resolve(JSON.parse(rowData));
        });
      })
      .on("error", (err) => {
        reject(err);
      });
  });
}

function httpPost(postOptions: PostOptions) {
  return new Promise((resolve, reject) => {
    const postRequest = http.request(postOptions, (response) => {
      response.setEncoding("utf8");
      response.on("data", (data) => {
        resolve(JSON.parse(data));
      });
    });

    postRequest.on("error", (err) => {
      reject(err);
    });

    postRequest.end();
  });
}

router.get("/", async (req, res) => {
  console.log(repo);
  try {
    const books = await repo.getBooks();
    //const books = await Book.find();
    res.render("./index", { title: "Главная", books });
  } catch {
    res.render("./pages/404", {
      title: "Ошибка 404",
    });
  }
});

router.get("/add", (req, res) => {
  res.render("./pages/create", {
    title: "Добавить книгу",
    book: {},
  });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const postOptions = {
    hostname: process.env.SERVICE || "localhost",
    port: "4000",
    path: `/${id}`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const book = await repo.getBook(id);
    //const book = await Book.findById(id);
    let obj: Obj;
    try {
      obj = (await httpPost(postOptions)) as Obj;
    } catch {
      obj = { id, count: "Данные о просмотрах не найдены" };
    }
    res.render("./pages/view", {
      title: book.title,
      book,
      count: obj?.count,
    });
  } catch {
    res.render("./pages/404", {
      title: "Ошибка 404",
    });
  }
});

router.post("/add", async (req, res) => {
  try {
    const book = await repo.createBook(req.body);
    res.redirect(301, "http://localhost:3000" + `/update/${book.id}`);
  } catch {
    res.render("./pages/404", {
      title: "Ошибка 404",
    });
  }
});

router.get("/update/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const book = await repo.getBook(id);
    //const book = await Book.findById(id);
    res.render("./pages/update", {
      title: book.title,
      book,
    });
  } catch {
    res.render("./pages/404", {
      title: "Ошибка 404",
    });
  }
});

router.post("/file/:id", fileMulter.single("fileBook"), async (req, res) => {
  const { id } = req.params;
  const bookURL = URL + id;
  if (req.file) {
    const { filename } = req.file;
    let obj: Obj;
    try {
      obj = (await httpGet(bookURL)) as Obj;
    } catch {
      obj = { id, count: "Данные о просмотрах не найдены" };
    }
    try {
      const book = await repo.updateBook(id, { fileName: filename });
      //await Book.findByIdAndUpdate(id, { fileName: filename });
      //const book = await Book.findById(id);

      if (!obj) {
        obj = { id, count: "Данные о просмотрах не найдены" };
      }
      res.render("./pages/view", {
        title: book.title,
        book,
        count: obj.count,
      });
    } catch {
      res.render("./pages/404", {
        title: "Ошибка 404",
      });
    }
  } else {
    res.render("./pages/404", {
      title: "Ошибка 404",
    });
  }
});

router.post("/cover/:id", coverMulter.single("fileCover"), async (req, res) => {
  const { id } = req.params;
  const bookURL = URL + id;
  if (req.file) {
    const { filename } = req.file;
    let obj: Obj;
    try {
      obj = (await httpGet(bookURL)) as Obj;
    } catch {
      obj = { id, count: "Данные о просмотрах не найдены" };
    }

    try {
      const book = await repo.updateBook(id, { fileCover: filename });
      //await Book.findByIdAndUpdate(id, { fileCover: filename });
      //const book = await Book.findById(id);
      if (!obj) {
        obj = { id, count: "Данные о просмотрах не найдены" };
      }
      res.render("./pages/view", {
        title: book.title,
        book,
        count: obj.count,
      });
    } catch {
      res.render("./pages/404", {
        title: "Ошибка 404",
      });
    }
  } else {
    res.render("./pages/404", {
      title: "Ошибка 404",
    });
  }
});

router.get("/download/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const book = await repo.getBook(id);
    //const book = await Book.findById(id);
    const { fileName } = book;
    const file = path.join(__dirname, `../public/books/${fileName}`);
    res.download(file);
  } catch {
    res.render("./pages/404", {
      title: "Ошибка 404",
    });
  }
});

router.post("/update/:id", async (req, res) => {
  const { id } = req.params;
  const bookURL = URL + id;

  let obj: Obj;
  try {
    obj = (await httpGet(bookURL)) as Obj;
  } catch {
    obj = { id, count: "Данные о просмотрах не найдены" };
  }
  try {
    const book = await repo.updateBook(id, req.body);
    //await Book.findByIdAndUpdate(id, req.body);
    //const book = await Book.findById(id);

    res.render("./pages/view", {
      title: book.title,
      book,
      count: obj.count,
    });
  } catch {
    res.render("./pages/404", {
      title: "Ошибка 404",
    });
  }
});

router.post("/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const books = await repo.deleteBook(id);
    res.render("./index", { title: "Главная", books });
  } catch {
    res.render("./pages/404", {
      title: "Ошибка 404",
    });
  }
});

export default router;
