import css from './Header.module.css';
import Link from 'next/link';
import TagsMenu from '../TagsMenu/TagsMenu';
import AuthNavigation from '../AuthNavigation/AuthNavigation';

export default function Header() {
  return (
    <header className={css.header}>
      <Link href='/' aria-label='Home' className={css.logo}>
        NoteHub
      </Link>
      <nav aria-label='Main Navigation'>
        <ul className={css.navigation}>
          <li>
            <TagsMenu />
          </li>
          <li>
            <Link href='/' className={css.navigationLink}>
              Home
            </Link>
          </li>
          
          <AuthNavigation />
        </ul>
      </nav>
    </header>
  );
}