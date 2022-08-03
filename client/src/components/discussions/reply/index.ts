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
      votes,
    },
    currentUser,
    commentId,
  } = data;

  const isUpVoted = !!votes.find((id) => id.toString() === currentUser.id);
  let counter = votes.length;

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
  renderReact(root, votes.length, `reply-${_id}`);

  //   Add's the vote action to the comment
  const voteElement = replyElement.querySelector<HTMLDivElement>(
    `.${styles.vote}`
  )!;
  setVoteAction(voteElement, isUpVoted);

  //   Add's the vote action to the comment
  voteElement.addEventListener('click', async () => {
    try {
      const res = await toggleVoteAPI({
        commentId,
        userId: currentUser.id,
        replyId: _id,
      });

      if (!res) {
        // setVotesCount(countElement, --counter);
        renderReact(root, --counter, `reply-${_id}`);
        setVoteAction(voteElement, false);
      } else {
        // setVotesCount(countElement, ++counter);
        renderReact(root, ++counter, `reply-${_id}`);
        setVoteAction(voteElement, true);
      }
    } catch (error) {
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

/*

  Add's the vote count to the comment

  */

const setVotesCount = (element: HTMLDivElement, count: number) => {
  if (count === 0) element.innerHTML = '';
  else
    element.innerHTML = `${count} ${icons.heart.toSvg({
      class: styles.icon,
    })}`;
};
