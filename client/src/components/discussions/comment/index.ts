import moment from 'moment';
import { icons } from 'feather-icons';
import { CommentPayload } from '../../../interfaces/comment';
import styles from './styles.module.scss';
import { toggleVoteAPI } from '../../../api/comments';
export const constructComment = (data: {
  payload: CommentPayload;
  currentUserId: string;
}) => {
  const {
    payload: {
      _id,
      comment,
      date,
      user: { image, name },
      votes,
    },
    currentUserId,
  } = data;

  const isUpVoted = !!votes.find((id) => id.toString() === currentUserId);
  let counter = votes.length;

  const commentElement = document.createElement('div');

  commentElement.className = styles.comment;
  commentElement.innerHTML = `
    <img class="${styles.image}" src="${image}" alt="${name} photo" />
    <div class="${styles.details}">
      <h4 class="${styles.name}">
        ${name}<span class="${styles.date}"
          >. ${moment(date).fromNow()}
        </span>
      </h4>
      <p class="${styles.text}">${comment}</p>
      <div class="${styles.actions}">
        <div class="${styles.count}"></div>
        <div class="${styles.vote}"></div>
      </div>
    </div>
  `;

  //   Add's the vote count to the comment
  const countElement = commentElement.querySelector<HTMLDivElement>(
    `.${styles.count}`
  )!;
  setVotesCount(countElement, counter);

  //   Add's the vote action to the comment
  const voteElement = commentElement.querySelector<HTMLDivElement>(
    `.${styles.vote}`
  )!;
  setVoteAction(voteElement, isUpVoted);

  //   Add's the vote action to the comment
  voteElement.addEventListener('click', async () => {
    try {
      const res = await toggleVoteAPI(_id, currentUserId);

      if (!res) {
        setVotesCount(countElement, --counter);
        setVoteAction(voteElement, false);
      } else {
        setVotesCount(countElement, ++counter);
        setVoteAction(voteElement, true);
      }
    } catch (error) {
      console.log(error);
      //  TODO : Handle error
    }
  });

  return commentElement;
};

const setVoteAction = (element: HTMLDivElement, isUpVoted: boolean) => {
  if (isUpVoted) {
    element.innerHTML = `
        ${icons.triangle.toSvg({ class: `${styles.icon} ${styles.reverse}` })}
        Downvote
      `;
  } else {
    element.innerHTML = `
        ${icons.triangle.toSvg({ class: styles.icon })}
        Upvote
      `;
  }
};

const setVotesCount = (element: HTMLDivElement, count: number) => {
  if (count === 0) element.innerHTML = '';
  else
    element.innerHTML = `${count} ${icons.heart.toSvg({
      class: styles.icon,
    })}`;
};
