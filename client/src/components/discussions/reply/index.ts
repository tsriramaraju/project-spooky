import { ReplyDoc } from '../../../interfaces/comment';
import { icons } from 'feather-icons';
import styles from './styles.module.scss';
import { User } from '../../../interfaces/user';
import moment from 'moment';
import { setVoteAction, setVotesCount } from '../comment';

export const constructReply = (data: {
  reply: ReplyDoc;
  currentUser: User;
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
  } = data;

  const isUpVoted = !!votes.find((id) => id.toString() === currentUser.id);
  let counter = votes.length;

  const replyElement = document.createElement('div');

  replyElement.className = styles.comment;
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
  setVotesCount(countElement, counter);

  //   Add's the vote action to the comment
  const voteElement = replyElement.querySelector<HTMLDivElement>(
    `.${styles.vote}`
  )!;
  setVoteAction(voteElement, isUpVoted);

  return replyElement;
};
