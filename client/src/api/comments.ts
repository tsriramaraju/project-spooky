import { CommentAttrs, CommentPayload } from '../interfaces/comment';

export const api = 'http://192.168.0.121:4545/api/v1/comments';

export const getCommentsAPI = async (): Promise<CommentPayload[]> => {
  const response = await fetch(api);
  const data = await response.json();
  return data;
};

export const addCommentAPI = async (
  data: CommentAttrs
): Promise<CommentPayload> => {
  const response = await fetch(api, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const comment = await response.json();
  return comment;
};

export const toggleVoteAPI = async (
  commentID: string,
  userId: string
): Promise<Boolean> => {
  const response = await fetch(`${api}/${commentID}`, {
    method: 'PUT',
    body: JSON.stringify({ userId }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const status = await response.json();
  return status;
};
