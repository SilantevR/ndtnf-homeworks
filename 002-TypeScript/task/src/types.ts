export interface BookI {
  title: string;
  description: string;
  authors: string;
  favorite?: boolean;
  fileCover?: string;
  fileName?: string;
  comments?: [
    {
      comment: string;
      user: {
        _id: string;
        username: string;
      };
    }
  ];
}
