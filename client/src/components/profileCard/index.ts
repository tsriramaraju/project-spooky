import styles from './styles.module.scss';
import image from '../../assets/sriram.jpg';
import { icons } from 'feather-icons';

export const setUpProfileCard = (id: string) => {
  const element = document.querySelector<HTMLDivElement>(id);
  if (!element) return;

  element.className = styles.profileCard;

  element.innerHTML = `
    <div class="${styles.header}">
      <img src="${image}" alt="" class="${styles.image}" />
      <div class="${styles.details}">
        <div class="${styles.row1}">
          <p class="${styles.name}">
            T Sri Rama Raju
            <span class="${styles.span}">26</span>
          </p>
          <div class="${styles.button}">
            Follow ${icons['user-plus'].toSvg({ class: styles.icon })}
          </div>
        </div>
        <div class="${styles.row2}">
          <p class="${styles.chip}">#Programming</p>
          <p class="${styles.chip}">#Startups</p>
          <p class="${styles.chip}">#Films</p>
        </div>
      </div>
    </div>
    <div class="${styles.text}">
      A full stack developer and founder of the SASS application Storzey. A
      super app for managing multiple operations for business owners, including
      order fulfillment, inventory management, accounting, logistics, CRM, CMS,
      website design, and many others.        
    </div>
    <div class="${styles.footer}">
      <div class="${styles.dateBlock}">
        <p class="${styles.heading}">Joined</p>
        <p class="${styles.date}">Jul 26, 2018</p>
      </div>
      <div class="${styles.statsBlock}">
        <p class="${styles.text}">
          13 ${icons['file-text'].toSvg({ class: styles.icon })}
        </p>
        <p class="${styles.text}">
          69 ${icons['users'].toSvg({ class: styles.icon })}
        </p>
      </div>
    </div>
       `;
};
