'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import type { User, Session } from '@supabase/supabase-js';

export interface AdminUser {
  id: string;
  auth_id: string;
  email: string;
  role: 'admin' | 'super_admin';
  is_active: boolean;
}

interface UseAdminAuthReturn {
  user: User | null;
  adminUser: AdminUser | null;
  session: Session | null;
  accessToken: string | null;
  loading: boolean;
  error: string | null;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export function useAdminAuth(): UseAdminAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Check auth status on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get current session
        const { data: { session: currentSession }, error: sessionError } =
          await supabase.auth.getSession();

        if (sessionError) throw sessionError;

        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        setAdminUser(null);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Auth check failed';
        setError(message);
        setAdminUser(null);
      } finally {
        setLoading(false);
      }
    };

    // Check auth on mount
    checkAuth();

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, updatedSession) => {
      setSession(updatedSession);
      setUser(updatedSession?.user ?? null);
      setAdminUser(null);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const signIn = useCallback(
    async (email: string, password: string) => {
      try {
        setLoading(true);
        setError(null);

        const { data, error: signInError } =
          await supabase.auth.signInWithPassword({
            email,
            password,
          });

        if (signInError) throw signInError;

        if (data.session?.user) {
          setSession(data.session);
          setUser(data.session.user);
          setAdminUser(null);
        }

        router.push('/admin/certificates');
        router.refresh();
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Sign in failed';
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [router]
  );

  const signOut = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { error: signOutError } = await supabase.auth.signOut();

      if (signOutError) throw signOutError;

      setUser(null);
      setAdminUser(null);
      setSession(null);

      router.push('/');
      router.refresh();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Sign out failed';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [router]);

  return {
    user,
    adminUser,
    session,
    accessToken: session?.access_token ?? null,
    loading,
    error,
    isAdmin: !!session?.user,
    signIn,
    signOut,
  };
}
