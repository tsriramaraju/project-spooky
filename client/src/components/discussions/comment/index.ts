import moment from 'moment';
import { icons } from 'feather-icons';
import { CommentDoc } from '../../../interfaces/comment';
import styles from './styles.module.scss';
import { addReplyAPI, toggleVoteAPI } from '../../../api/comments';
import { handleServerErrors } from '../../../utils/handleServerErrors';
import { User } from '../../../interfaces/user';
import { constructReply } from '../reply';
export const constructComment = (data: {
  payload: CommentDoc;
  currentUser: User;
}) => {
  const {
    payload: {
      _id,
      comment,
      date,
      user: { image, name },
      votes,
      replies,
    },
    currentUser,
  } = data;

  const isUpVoted = !!votes.find((id) => id.toString() === currentUser.id);
  let counter = votes.length;

  const commentElement = document.createElement('div');

  commentElement.className = styles.comment;
  commentElement.innerHTML = `
      <div class="${styles.imageBlock}">
        <img class="${styles.image}" src="${image}" alt="${name} photo" />
        <div class="${styles.line} ${!replies.length && styles.hide}"></div>
      </div>
    <div class="${styles.details}">
      <h4 class="${styles.name}">
        ${name}<span class="${styles.date}">. ${moment(date).fromNow()} </span>
      </h4>
      <p class="${styles.text}">${comment}</p>
      <div class="${styles.actions}">
        <div class="${styles.count}"></div>
        <div class="${styles.vote}"></div>
        <div class="${styles.reply}" data-input="hidden">Reply</div>
      </div>
      <form class="${styles.form} ${styles.hide}" action="">
        <img
          class="${styles.image}"
          src="${currentUser.image}"
          alt="${currentUser.name} image"
        />
        <textarea
          class="${styles.input}"
          cols="30"
          rows="10"
          placeholder="What are your thoughts?"
        ></textarea>
        <button class="${styles.button}" type="submit">Reply</button>
      </form>
      <div class="${styles.replies}"></div>
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
      const res = await toggleVoteAPI({
        commentId: _id,
        userId: currentUser.id,
      });

      if (!res) {
        setVotesCount(countElement, --counter);
        setVoteAction(voteElement, false);
      } else {
        setVotesCount(countElement, ++counter);
        setVoteAction(voteElement, true);
      }
    } catch (error) {
      handleServerErrors(error);
    }
  });

  //   Add's the reply toggle to the comment
  const replyElement = commentElement.querySelector<HTMLDivElement>(
    `.${styles.reply}`
  )!;

  replyElement.addEventListener('click', () => {
    toggleReply(replyElement, commentElement);
  });

  // Add existing replies to the comment
  if (replies.length) {
    const repliesContainer = commentElement.querySelector<HTMLDivElement>(
      `.${styles.replies}`
    )!;

    replies.forEach((reply) => {
      const replyElement = constructReply({
        reply,
        currentUser,
        commentId: _id,
      });
      repliesContainer.append(replyElement);
    });
  }

  // Reply form submit handler

  const replyForm = commentElement.querySelector<HTMLFormElement>(
    `.${styles.form}`
  )!;

  replyForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const input = replyForm.querySelector<HTMLInputElement>(
      `.${styles.input}`
    )!;

    try {
      const replyId = await addReplyAPI({
        commentId: _id,
        reply: {
          reply: input.value,
          user: currentUser,
        },
      });

      const reply = constructReply({
        currentUser,
        commentId: _id,
        reply: {
          _id: replyId,
          reply: input.value,
          user: currentUser,
          date: new Date(),
          votes: [],
        },
      });

      const repliesContainer = commentElement.querySelector<HTMLDivElement>(
        `.${styles.replies}`
      )!;

      const line = commentElement.querySelector<HTMLDivElement>(
        `.${styles.line}`
      )!;

      line.classList.remove(styles.hide);

      repliesContainer.appendChild(reply);
      toggleReply(replyElement, commentElement);
    } catch (error) {
      handleServerErrors(error);
    }
  });

  return commentElement;
};

/*

  Add's toggle functionality to vote button

  */

export const setVoteAction = (
  element: HTMLDivElement,
  isUpVoted: boolean,
  iconStyles?: string
) => {
  if (isUpVoted) {
    element.innerHTML = `
        ${icons.triangle.toSvg({
          class: iconStyles ? iconStyles : `${styles.icon} ${styles.reverse}`,
        })}
        Downvote
      `;
  } else {
    element.innerHTML = `
        ${icons.triangle.toSvg({
          class: iconStyles ? iconStyles : styles.icon,
        })}
        Upvote
      `;
  }
};

/*

  Add's the vote count to the comment

  */

export const setVotesCount = (
  element: HTMLDivElement,
  count: number,
  iconStyles?: string
) => {
  if (count === 0) element.innerHTML = '';
  else
    element.innerHTML = `${count} ${icons.heart.toSvg({
      class: iconStyles ? iconStyles : styles.icon,
    })}`;
};

/*

  Add's input toggle functionality to the reply button

  */

const toggleReply = (
  replyButton: HTMLDivElement,
  commentElement: HTMLDivElement
) => {
  //get data value
  const toggleValue = replyButton.dataset.input;

  const replyForm = commentElement.querySelector<HTMLFormElement>(
    `.${styles.form}`
  )!;

  //  Toggle the reply form based on the value of the data attribute
  if (toggleValue === 'hidden') {
    replyButton.dataset.input = 'visible';
    replyButton.innerHTML = `Cancel`;
    replyForm.classList.remove(styles.hide);
  } else {
    replyButton.dataset.input = 'hidden';
    replyButton.innerHTML = `Reply`;
    replyForm.classList.add(styles.hide);
    const input = replyForm.querySelector<HTMLInputElement>(
      `.${styles.input}`
    )!;

    // clear the input field when the reply is cancelled

    input.value = '';
  }
};
