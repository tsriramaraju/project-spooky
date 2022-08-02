import styles from './styles.module.scss';

export const setUpRecentPosts = (id: string) => {
  const element = document.querySelector<HTMLDivElement>(id);
  if (!element) return;

  element.className = styles.recentPosts;

  element.innerHTML = `
   <div class="${styles.post}">
      <h3 class="${styles.title}">Using Mantine with React and Next</h3>
      <p class="${styles.meta}">
        <span class="${styles.name}">Daniel Ita,</span>
        Aug 2nd, 2022
        <span class="${styles.time}">5 Min</span>
      </p>
      <p class="${styles.content}">
     Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio inventore, ducimus aliquam nemo quam ut nesciunt ad delectus. Quis porro totam sint facilis molestiae error mollitia consequuntur dolorum esse nihil, perferendis alias? Doloribus, at iusto! Assumenda laboriosam tempore inventore delectus?
      </p>
    </div>
    <div class="${styles.ruler}"></div>
    <div class="${styles.post}">
      <h3 class="${styles.title}">Using Mantine with React and Next</h3>
      <p class="${styles.meta}">
        <span class="${styles.name}">Daniel Ita,</span>
        Aug 2nd, 2022
        <span class="${styles.time}">5 Min</span>
      </p>
      <div class="${styles.content}">
     Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio inventore, ducimus aliquam nemo quam ut nesciunt ad delectus. Quis porro totam sint facilis molestiae error mollitia consequuntur dolorum esse nihil, perferendis alias? Doloribus, at iusto! Assumenda laboriosam tempore inventore delectus?
      </div>
    </div>
    <div class="${styles.ruler}"/></div>
    <div class="${styles.post}">
      <h3 class="${styles.title}">Using Mantine with React and Next</h3>
      <p class="${styles.meta}">
        <span class="${styles.name}">Daniel Ita,</span>
        Aug 2nd, 2022
        <span class="${styles.time}">5 Min</span>
      </p>
      <p class="${styles.content}">
     Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio inventore, ducimus aliquam nemo quam ut nesciunt ad delectus. Quis porro totam sint facilis molestiae error mollitia consequuntur dolorum esse nihil, perferendis alias? Doloribus, at iusto! Assumenda laboriosam tempore inventore delectus?
      </p>
    </div>
    <div class="${styles.ruler}"/></div>
    <div class="${styles.post}">
      <h3 class="${styles.title}">Using Mantine with React and Next</h3>
      <p class="${styles.meta}">
        <span class="${styles.name}">Daniel Ita,</span>
        Aug 2nd, 2022
        <span class="${styles.time}">5 Min</span>
      </p>
      <p class="${styles.content}">
     Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio inventore, ducimus aliquam nemo quam ut nesciunt ad delectus. Quis porro totam sint facilis molestiae error mollitia consequuntur dolorum esse nihil, perferendis alias? Doloribus, at iusto! Assumenda laboriosam tempore inventore delectus?
      </p>
    </div>
    <div class="${styles.ruler}"/></div>
    <div class="${styles.post}">
      <h3 class="${styles.title}">Using Mantine with React and Next</h3>
      <p class="${styles.meta}">
        <span class="${styles.name}">Daniel Ita,</span>
        Aug 2nd, 2022
        <span class="${styles.time}">5 Min</span>
      </p>
      <p class="${styles.content}">
     Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio inventore, ducimus aliquam nemo quam ut nesciunt ad delectus. Quis porro totam sint facilis molestiae error mollitia consequuntur dolorum esse nihil, perferendis alias? Doloribus, at iusto! Assumenda laboriosam tempore inventore delectus?
      </p>
    </div >
      `;
};
