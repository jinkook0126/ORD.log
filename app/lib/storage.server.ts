import { randomUUID } from 'node:crypto';

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL || '', process.env.SUPABASE_ANON_KEY || '');

export const uploadFile = async (file: File, bucket: string) => {
  const ext = file.name.split('.').pop();
  const fileName = `${randomUUID()}.${ext}`;
  const { data, error } = await supabase.storage.from(bucket).upload(fileName, file);
  if (error) throw error;
  return data.path;
};

export const deleteFile = async (path: string, bucket: string) => {
  const { error } = await supabase.storage.from(bucket).remove([path]);
  if (error) throw error;
};

export const getStoragePathFromPublicUrl = (url: string, bucket: string) => {
  const prefix = `${process.env.SUPABASE_URL}/storage/v1/object/public/${bucket}/`;
  return url.startsWith(prefix) ? url.slice(prefix.length) : null;
};
