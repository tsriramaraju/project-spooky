import { setUpDiscussions } from '../discussions';
import styles from './styles.module.scss';

export const setUpContent = (id: string) => {
  const element = document.querySelector<HTMLDivElement>(id);
  if (!element) return;

  element.className = styles.content;

  element.innerHTML = `
   <h2 class="${styles.heading}">
      My First Resume and it's not the convention!
    </h2>
   <iframe
     allowfullscreen="allowfullscreen"
     scrolling="no"
     class="fp-iframe"
     style="border: 1px solid lightgray; width: 100%; height: 600px;"
     src="https://heyzine.com/flip-book/7f6e1515d6.html"
   ></iframe>
    <p class="${styles.text}">
   Why should everything be conventional? My professional journey began unconventionally. While developing websites for multiple businesses, I also  worked as a professional media manager for two years, managing several clients' digital needs. Earlier in my career, I worked for early stage startups and later started my own company called Storzey, where I developed the entire SASS application from scratch. In this journey of wearing multiple hats and tackling many challenges, I have become a better programmer in the process, by understanding the vision and scope of the project.

  In spite of my passion for business, marketing, and operations, developing the product is what I enjoy the most. I enjoy understanding the pain points of various tedious tasks and coming up with my own solutions to solve them. Due to my desire to focus only on product development, I'm seeking my first job. Nowadays, people seem more interested in the "fancies" of a job, such as the big companies, fat paychecks, and stock values, rather than the purpose of the job itself. For me, meaningful work means bringing value to my team and learning a lot along the way. It was important for me to be a part of the team where everyone takes pride in their work and has a passion for achieving goals. Therefore, I tailored my resume in such a way that the employer gets to know what I could offer. 
  
  Hopefully, this resume will get me the job I am looking for.
    </p>
    <div id="discussions"></div>
      `;

  setUpDiscussions('#discussions');
};
