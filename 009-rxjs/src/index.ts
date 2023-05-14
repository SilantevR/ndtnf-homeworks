import { of, from, timer, range } from "rxjs";
import { ajax } from "rxjs/ajax";

const o = range(0, 10);

o.subscribe({
  next: (value: any) => console.log("Next:", value),
  complete: () => console.log("Complete!"),
  error: (error) => console.log("Error!", error),
});

const gitHub = ajax.getJSON(
  "https://api.github.com/search/repositories?q=rxjs"
);
gitHub.subscribe((value) => console.log("Github", value));

const gitLab = ajax.getJSON("https://gitlab.com/api/v4/projects?search=rxjs");
gitLab.subscribe((value) => console.log("Gitlab", value));
