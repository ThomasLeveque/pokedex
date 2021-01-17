export interface User extends AdditionalUserData {
  email: string;
  isAdmin: boolean;
  createdAt: number;
  updatedAt: number;
  starterId: string | null;
}

export interface AdditionalUserData {
  pseudo: string;

  // TO DEFINE
  character?: string;
}
