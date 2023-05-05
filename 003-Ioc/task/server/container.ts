import { Container } from "inversify";
import { BookRepository } from "./bookRepository";

const container = new Container();
container.bind(BookRepository).toSelf().inSingletonScope();

export { container };
