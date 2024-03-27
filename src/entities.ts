export type UserDto = {
  id: number;
  name: string;
  isAdmin?: boolean;
};

export type CategoryDto = {
  id: number;
  name: string;
  description?: string | null;
};

export type RecordDto = {
  id: number;
  categoryId: number;
  title: string;
  username: string;
  password: string;
  url?: string | null;
  notes?: string | null;
};
