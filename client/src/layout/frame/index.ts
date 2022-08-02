import { setUpProfileCard } from '../../components/profileCard';
import '../../scss/global.scss';
import { setupHeader } from '../header';
import styles from './styles.module.scss';

export const setUpFrame = (id: string) => {
  const element = document.querySelector<HTMLDivElement>(id);
  if (!element) return;

  element.className = styles.frame;

  element.innerHTML = `
    <div id="header" class="${styles.header}"></div>
    <div class="${styles.body}" id="body">
      <div id="profile_card_mini"></div>
      <div id="content"></div>
    </div>
    <div class="${styles.sideBar}">
      <div id="profile_card"></div>
      <div id="recent_posts"></div>
    </div>
       `;

  setupHeader('#header');
  setUpProfileCard('#profile_card');
};
