export interface CommentPayload {
  _id: string;
  comment: string;
  votes: string[];
  date: Date;
  postId: string;
  user: {
    id: string;
    name: string;
    image: string;
  };
}

export interface CommentAttrs {
  comment: string;
  user: {
    name: string;
    image: string;
  };
}
