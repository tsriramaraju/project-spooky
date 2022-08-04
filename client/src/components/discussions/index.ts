import { addCommentAPI, getCommentsAPI } from '../../api/comments';
import { usersData } from '../../dummyData/users';
import { User } from '../../interfaces/user';
import { handleServerErrors } from '../../utils/handleServerErrors';
import { constructComment } from './comment';
import styles from './styles.module.scss';

export const setUpDiscussions = (id: string) => {
  const element = document.querySelector<HTMLDivElement>(id);
  if (!element) return;

  // get a random user
  const user = usersData[Math.floor(Math.random() * usersData.length)];

  element.className = styles.container;

  element.innerHTML = `
    <h2 class="${styles.heading}">Discussions</h2>
    <form class="${styles.form}" action="">
      <img
        class="${styles.image}"
        src="${user.image}"
        alt="${user.name} image"
      />
      <textarea
        class="${styles.input}"
        name=""
        cols="30"
        rows="10"
        placeholder="What are your thoughts?"
      ></textarea>
      <button class="${styles.button}" type="submit">Comment</button>
    </form>
    <div class="${styles.ruler}"></div>
    <div class="${styles.comments}"></div>
              `;

  // Load existing comments from the server
  const commentsContainer = element.querySelector<HTMLDivElement>(
    `.${styles.comments}`
  )!;
  addExistingComments(commentsContainer, user);

  // Handle the form submission
  const form = element.querySelector<HTMLFormElement>(`.${styles.form}`)!;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const input = form.querySelector<HTMLInputElement>(`.${styles.input}`)!;

    try {
      const res = await addCommentAPI({
        comment: input.value,
        user,
      });
      console.log('res', res);
      const commentElement = constructComment({
        payload: res,
        currentUser: user,
      });

      commentsContainer.append(commentElement);
      input.value = '';
    } catch (error) {
      handleServerErrors(error);
    }
  });
};

const addExistingComments = async (
  element: HTMLDivElement,
  currentUser: User
) => {
  const existingComments = await getCommentsAPI();

  const comments = existingComments.map((comment) =>
    constructComment({ payload: comment, currentUser })
  );

  element.append(...comments);
};
