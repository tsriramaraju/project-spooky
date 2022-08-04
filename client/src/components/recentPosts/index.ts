import styles from './styles.module.scss';

export const setUpRecentPosts = (id: string) => {
  const element = document.querySelector<HTMLDivElement>(id);
  if (!element) return;

  element.className = styles.recentPosts;

  element.innerHTML = `
  <div class="${styles.post}">
      <h3 class="${styles.title}">I was such a naive!</h3>
      <p class="${styles.meta}">
        Sep 19th, 2018
        <span class="${styles.time}">10 Min</span>
      </p>
      <p class="${styles.content}">
       In early days of my professional journey, I thought life would be simpler and predictable. I was not aware of the challenges I was thrown into.
      </p>
    </div>
    <div class="${styles.ruler}">&nbsp;</div>
    <div class="${styles.post}">
      <h3 class="${styles.title}">Things I learnt from media experience.</h3>
      <p class="${styles.meta}">
        May 1st, 2019
        <span class="${styles.time}">8 Min</span>
      </p>
      <div class="${styles.content}">
        I learnt and explored different roles in media. I've understood the art of storytelling and the importance of having a clear and concise story.
      </div>
    </div>
    <div class="${styles.ruler}">&nbsp;</div>
    <div class="${styles.post}">
      <h3 class="${styles.title}">How I failed in my first startup.</h3>
      <p class="${styles.meta}">
        Aug 2nd, 2019
        <span class="${styles.time}">5 Min</span>
      </p>
      <p class="${styles.content}">
        I started too early with minimal knowledge of the industry. I just had an idea and wanted to build it. But it didn't work.
      </p>
    </div>
    <div class="${styles.ruler}">&nbsp;</div>
    <div class="${styles.post}">
      <h3 class="${styles.title}">Why did I start Storzey?</h3>
      <p class="${styles.meta}">
        March 30th, 2020
        <span class="${styles.time}">12 Min</span>
      </p>
      <p class="${styles.content}">
        After working with several clients, I thought all their basic requirements can be addressed by a single platform. I started Storzey to solve this problem.
      </p>
    </div>
     <div class="${styles.ruler}">&nbsp;</div>
    <div class="${styles.post}">
      <h3 class="${styles.title}">Times when hustle was everything.</h3>
      <p class="${styles.meta}">
        Jan 4th, 2022
        <span class="${styles.time}">3 Min</span>
      </p>
      <p class="${styles.content}">
       I was so focused on my work that I didn't have time to do anything else. I was always hustling and always had a goal.
      </p>
    </div>

      `;
};
