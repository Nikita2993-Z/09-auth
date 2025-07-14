
import Link from 'next/link';
import css from './default.module.css';

const TAGS = ['All', 'Work', 'Personal', 'Meeting', 'Shopping', 'Todo'];

export default function SidebarPage() {
  return (
    <nav>
      <ul className={css.menuList}>
        {TAGS.map((tag) => (
          <li key={tag} className={css.menuItem}>
            <Link
              href={`/notes/filter/${tag}`}
              className={css.menuLink}
            >
              {tag === 'All' ? 'All notes' : tag}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}