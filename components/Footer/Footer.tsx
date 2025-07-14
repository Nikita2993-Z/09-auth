import css from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
        <div className={css.wrap}>
          <p>Developer: Nikita2993-Z</p>
          <p>
            Contact us:
            <a href="zinchenko.nikita93@gmail.com"> Nikita Zinchenko</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;