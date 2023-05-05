export interface Comment {
  comment: string;
  user: {
    _id: string;
    username: string;
  };
}
