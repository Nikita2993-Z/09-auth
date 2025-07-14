'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import css from './TagsMenu.module.css';

const TAGS = ['All', 'Work', 'Personal', 'Meeting', 'Shopping', 'Todo'] as const;

export default function TagsMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

 
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  
  function toggleMenu() {
    setOpen((prev) => !prev);
  }

  
  function handleSelect() {
    setOpen(false);
  }

  return (
    <div className={css.menuContainer} ref={menuRef}>
      <button onClick={toggleMenu} className={css.menuButton}>
        Notes ▾
      </button>

      {open && (
        <ul className={css.menuList}>
          {TAGS.map((tag) => (
            <li key={tag} className={css.menuItem}>
              <Link
                href={`/notes/filter/${tag}`}
                onClick={handleSelect}
                className={css.menuLink}
              >
                {tag === 'All' ? 'All notes' : tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
);
}