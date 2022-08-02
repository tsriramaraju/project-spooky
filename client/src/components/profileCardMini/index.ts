import styles from './styles.module.scss';
import image from '../../assets/sriram.jpg';
import { icons } from 'feather-icons';

export const setUpProfileCardMini = (id: string) => {
  const element = document.querySelector<HTMLDivElement>(id);

  if (!element) return;

  element.className = styles.profileCardMini;

  element.innerHTML = `
    <img class="${styles.image}" src="${image}" alt="Profile picture" />
    <div class="${styles.details}">
      <h4 class="${styles.name}">T Sri Rama Raju</h4>
      <p class="${styles.meta}">Aug 2,2022. 5min read</p>
    </div>
    <div class="${styles.iconsContainer}">
      ${icons.facebook.toSvg({ class: styles.icon })} ${icons.twitter.toSvg({
    class: styles.icon,
  })} ${icons.youtube.toSvg({ class: styles.icon })}
      ${icons.link.toSvg({ class: styles.icon })}
    </div>
      `;
};
