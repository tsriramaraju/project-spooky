import { ReplyDoc } from '../../../interfaces/comment';
import { icons } from 'feather-icons';
import styles from './styles.module.scss';
import { User } from '../../../interfaces/user';
import moment from 'moment';
import { toggleVoteAPI } from '../../../api/comments';
import { handleServerErrors } from '../../../utils/handleServerErrors';
import { getRoot, renderReact } from '../../../utils/setupReact';

export const constructReply = (data: {
  reply: ReplyDoc;
  currentUser: User;
  commentId: string;
}) => {
  const {
    reply: {
      _id,
      date,
      reply,
      user: { image, name },
    },
    currentUser,
    commentId,
  } = data;

  let votes = [...data.reply.votes];

  const getIsUpVoted = () => {
    return !!votes.find((id) => id.toString() === currentUser.id);
  };

  const replyElement = document.createElement('div');

  replyElement.className = styles.reply;
  replyElement.innerHTML = `
      
   <img class="${styles.image}" src="${image}" alt="${name} photo" />
    
    <div class="${styles.details}">
      <h4 class="${styles.name}">
        ${name}<span class="${styles.date}">. ${moment(date).fromNow()} </span>
      </h4>
      <p class="${styles.text}">${reply}</p>
      <div class="${styles.actions}">
        <div class="${styles.count}"></div>
        <div class="${styles.vote}"></div>
      </div>
    </div>
  `;

  //   Add's the vote count to the comment
  const countElement = replyElement.querySelector<HTMLDivElement>(
    `.${styles.count}`
  )!;

  const root = getRoot(countElement);
  renderReact(root, votes.length, `reply-${_id}`, currentUser.id);

  //   Add's the vote action to the reply
  const voteElement = replyElement.querySelector<HTMLDivElement>(
    `.${styles.vote}`
  )!;
  setVoteAction(voteElement, getIsUpVoted());

  const upvote = () => {
    votes.push(currentUser.id);
    renderReact(root, votes.length, `reply-${_id}`, currentUser.id);
    setVoteAction(voteElement, true);
  };

  const downvote = () => {
    votes = [
      ...votes.filter((id) => id.toString() !== currentUser.id.toString()),
    ];
    renderReact(root, votes.length, `reply-${_id}`, currentUser.id);
    setVoteAction(voteElement, false);
  };

  //   Add's the vote action to the comment
  voteElement.addEventListener('click', async () => {
    // Update the vote count offline for better experience
    getIsUpVoted() ? downvote() : upvote();

    try {
      const res = await toggleVoteAPI({
        commentId: commentId,
        userId: currentUser.id,
        replyId: _id,
      });
      // Fallback if comment already voted in other session
      if (res !== getIsUpVoted()) {
        console.log('fallback');
        getIsUpVoted() ? downvote() : upvote();
      }
    } catch (error) {
      // Fallback if server fails to update vote
      getIsUpVoted() ? downvote() : upvote();

      handleServerErrors(error);
    }
  });

  return replyElement;
};

/*

  Add's toggle functionality to vote button

  */

const setVoteAction = (element: HTMLDivElement, isUpVoted: boolean) => {
  if (isUpVoted) {
    element.innerHTML = `
        ${icons.triangle.toSvg({
          class: `${styles.icon} ${styles.reverse}`,
        })}
        Downvote
      `;
  } else {
    element.innerHTML = `
        ${icons.triangle.toSvg({
          class: styles.icon,
        })}
        Upvote
      `;
  }
};
