import { CommentAttrs, CommentDoc, ReplyAttrs } from '../interfaces/comment';
import axios from 'axios';
export const api = 'http://192.168.0.121:4545/api/v1/comments';
// export const api = 'https://storzey.com/api/v1/comments';

export const getCommentsAPI = async (): Promise<CommentDoc[]> => {
  const res = await axios.get(api);
  return res.data;
};

export const addCommentAPI = async (
  data: CommentAttrs
): Promise<CommentDoc> => {
  const response = await axios.post(api, data);
  return response.data;
};

export const toggleVoteAPI = async (data: {
  commentId: string;
  userId: string;
  replyId?: string;
}): Promise<Boolean> => {
  const { commentId, userId, replyId } = data;
  const response = await axios.put(`${api}/${commentId}/${replyId}`, {
    userId,
  });
  return response.data;
};

export const addReplyAPI = async (data: {
  commentId: string;
  reply: ReplyAttrs;
}): Promise<string> => {
  const { commentId, reply } = data;
  const response = await axios.post(`${api}/${commentId}`, reply);
  return response.data;
};
