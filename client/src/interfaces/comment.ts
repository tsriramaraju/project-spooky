export interface CommentDoc {
  _id: string;
  comment: string;
  votes: string[];
  date: Date;
  postId: string;
  replies: ReplyDoc[];
  user: {
    id: string;
    name: string;
    image: string;
  };
}

export interface ReplyDoc {
  _id: string;
  reply: string;
  votes: string[];
  date: Date;
  user: {
    id: string;
    name: string;
    image: string;
  };
}

export interface ReplyAttrs {
  reply: string;
  user: {
    name: string;
    image: string;
    id: string;
  };
}
export interface CommentAttrs {
  comment: string;
  user: {
    name: string;
    image: string;
    id: string;
  };
}
