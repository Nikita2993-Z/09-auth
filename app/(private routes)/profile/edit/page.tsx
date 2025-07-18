'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { updateProfile, fetchProfile } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import css from './page.module.css';

export default function EditProfilePage() {
  const router = useRouter();
  const setUser = useAuthStore(s => s.setUser);
  const user = useAuthStore(s => s.user)!;

  const [username, setUsername] = useState(user.username);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      if (!user.username) {
        const profile = await fetchProfile();
        setUsername(profile.username);
      }
      setLoading(false);
    }
    load();
  }, [user]);

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const updatedUser = await updateProfile({
        email:    user.email,
        username,
      });
      setUser(updatedUser);
      router.push('/profile');
    } catch {
      setError('Failed to update profile.');
    }
  };

  const handleCancel = () => {
    router.push('/profile');
  };

  if (loading) return <div className={css.loader}>Loading...</div>;

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>
        <Image
          src={user.avatar || '/avatar-placeholder.png'}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />
        <form className={css.profileInfo} onSubmit={handleSave}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              name="username"
              type="text"
              className={css.input}
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </div>
          <p>Email: {user.email}</p>
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