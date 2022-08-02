import styles from './styles.module.scss';
import { icons } from 'feather-icons';
import logo from '../../assets/logo.png';

export const setupHeader = (id: string) => {
  const element = document.querySelector<HTMLDivElement>(id);
  if (!element) return;
  element.innerHTML = `
    <div class="${styles.header}">
      <img src="${logo}" alt="logo" class="${styles.logo}" />
      <div class="${styles.iconsContainer}">
        ${icons.home.toSvg({ class: styles.icon })} ${icons.bookmark.toSvg({
    class: styles.icon,
  })} ${icons.bell.toSvg({ class: styles.icon })}
        ${icons.edit.toSvg({ class: styles.icon })}
        ${icons['more-horizontal'].toSvg({ class: styles.icon })}
      </div>
    </div>
       `;
};
