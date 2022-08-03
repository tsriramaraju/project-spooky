import { Model, Document } from "mongoose";

/**
 * Interface that describes the properties that are required to create a new Comment Document
 */
interface CommentAttrs {
  comment: string;
  user: {
    name: string;
    image: string;
    id: string;
  };
}

interface ReplyAttrs {
  reply: string;
  user: {
    name: string;
    image: string;
    id: string;
  };
}

/**
 * Interface that describes the methods that a Comment Model has
 */
interface CommentModel extends Model<CommentDoc> {
  build(attrs: CommentAttrs): CommentDoc;
}

/**
 * Interface that describes the properties that a Comment Document has
 */
interface CommentDoc extends Document {
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

/**
 * Interface that describes the properties that a nested Reply Document has
 */

interface ReplyDoc {
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

export { CommentAttrs, CommentDoc, CommentModel, ReplyAttrs, ReplyDoc };
