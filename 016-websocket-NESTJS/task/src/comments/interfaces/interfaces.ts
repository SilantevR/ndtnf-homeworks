export type User = {
  id: string;
  username: string;
};

export interface IComment {
  id: string;
  bookId: string;
  comment: string;
  user: User;
}
