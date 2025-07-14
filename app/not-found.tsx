import css from './page.module.css'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page not found – NoteHub",
  description: "The page you requested does not exist in NoteHub.",
  openGraph: {
    title: "404 - Page not found – NoteHub",
    description: "The page you requested does not exist in NoteHub.",
    url: "https://ac.goit.global/fullstack/react/not-found",
    images: [{ url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg" }],
  },
};


export default function NotFound () {
    return (
        <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>Sorry, the page you are looking for does not exist.</p>
    </div>
    )
    
}
