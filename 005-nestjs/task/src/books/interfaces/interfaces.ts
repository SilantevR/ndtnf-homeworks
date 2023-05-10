export interface IBook {
  id: string;
  title: string;
  description: string;
  authors: string;
  favorite: boolean;
  fileCover?: string;
  fileName?: string;
  comments?: [Comment];
}

export interface Comment {
  comment: string;
  user: {
    _id: string;
    username: string;
  };
}
