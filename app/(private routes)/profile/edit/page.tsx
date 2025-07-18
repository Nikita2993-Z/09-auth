'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import css from './page.module.css';
import { updateProfile, fetchProfile } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

export default function EditProfilePage() {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);
  const user = useAuthStore((s) => s.user);

  const [username, setUsername] = useState(user?.username || '');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      if (!user) {
        try {
          const profile = await fetchProfile();
          setUsername(profile.username);
        } catch {
        
        }
      }
      setLoading(false);
    }
    load();
  }, [user]);

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
   try {
  const updated = await updateProfile({ username });
  setUser(updated);
  router.push('/profile');
} catch {
  setError('Failed to update username.');
}
  };

  const handleCancel = () => {
    router.push('/profile');
  };

  if (loading) {
    return <div className={css.loader}>Loading...</div>;
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>
        <div className={css.avatarWrapper}>
          <Image
            src={user?.avatar || '/avatar-placeholder.png'}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <form className={css.profileInfo} onSubmit={handleSave}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              className={css.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <p>Email: {user?.email}</p>
          {error && <p className={css.error}>{error}</p>}
          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
