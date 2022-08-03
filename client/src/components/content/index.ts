import { setUpDiscussions } from '../discussions';
import styles from './styles.module.scss';

export const setUpContent = (id: string) => {
  const element = document.querySelector<HTMLDivElement>(id);
  if (!element) return;

  element.className = styles.content;
  //  <iframe
  //    allowfullscreen="allowfullscreen"
  //    scrolling="no"
  //    class="fp-iframe"
  //    style="border: 1px solid lightgray; width: 100%; height: 600px"
  //    src="https://heyzine.com/flip-book/7f6e1515d6.html"
  //  ></iframe>;
  element.innerHTML = `
   <h2 class="${styles.heading}">
      My First Resume and it's not the convention!
    </h2>
 
    <p class="${styles.text}">
Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora in, commodi eius officiis ducimus ipsa, officia sunt veniam quas praesentium quam voluptatem magnam possimus, porro architecto optio illum vel quaerat culpa magni ad. Est animi voluptatibus aliquam et, voluptatum necessitatibus culpa quos magni ut veritatis, aperiam distinctio dolore vitae fugit? Beatae consequuntur dignissimos explicabo pariatur neque itaque nesciunt inventore voluptates, vero quis et quasi maxime reiciendis nisi rerum tempora, similique cumque ratione tempore quidem amet voluptas debitis molestias? Laboriosam fugit, magnam quae quaerat explicabo animi neque autem corrupti sunt, doloribus nesciunt eaque totam maiores repellat similique. Illo quibusdam similique eos.
Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora in, commodi eius officiis ducimus ipsa, officia sunt veniam quas praesentium quam voluptatem magnam possimus, porro architecto optio illum vel quaerat culpa magni ad. Est animi voluptatibus aliquam et, voluptatum necessitatibus culpa quos magni ut veritatis, aperiam distinctio dolore vitae fugit? Beatae consequuntur dignissimos explicabo pariatur neque itaque nesciunt inventore voluptates, vero quis et quasi maxime reiciendis nisi rerum tempora, similique cumque ratione tempore quidem amet voluptas debitis molestias? Laboriosam fugit, magnam quae quaerat explicabo animi neque autem corrupti sunt, doloribus nesciunt eaque totam maiores repellat similique. Illo quibusdam similique eos.
    </p>
    <div id="discussions"></div>
      `;

  setUpDiscussions('#discussions');
};
