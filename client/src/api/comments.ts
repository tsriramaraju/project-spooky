import { CommentAttrs, CommentPayload } from '../interfaces/comment';
import axios from 'axios';
// export const api = 'http://192.168.0.121:4545/api/v1/comments';
export const api = 'https://storzey.com/api/v1/comments';

export const getCommentsAPI = async (): Promise<CommentPayload[]> => {
  const res = await axios.get(api);
  return res.data;
};

export const addCommentAPI = async (
  data: CommentAttrs
): Promise<CommentPayload> => {
  const response = await axios.post(api, data);
  return response.data;
};

export const toggleVoteAPI = async (
  commentID: string,
  userId: string
): Promise<Boolean> => {
  const response = await axios.put(`${api}/${commentID}`, {
    userId,
  });
  return response.data;
};
