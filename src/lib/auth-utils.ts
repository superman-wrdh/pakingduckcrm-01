import { User } from '@supabase/supabase-js';

export const getUserDisplayName = (user: User | null): string => {
  if (!user) return 'Guest';
  
  // Check user metadata for display name
  if (user.user_metadata?.display_name) {
    return user.user_metadata.display_name;
  }
  
  // Check user metadata for first/last name
  if (user.user_metadata?.first_name || user.user_metadata?.last_name) {
    return `${user.user_metadata.first_name || ''} ${user.user_metadata.last_name || ''}`.trim();
  }
  
  // Fallback to email
  return user.email?.split('@')[0] || 'User';
};

export const getUserAvatar = (user: User | null): string | undefined => {
  if (!user) return undefined;
  
  return user.user_metadata?.avatar_url || user.user_metadata?.picture;
};

export const isUserAuthenticated = (user: User | null): boolean => {
  return user !== null;
};