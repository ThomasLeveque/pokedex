export interface User extends AdditionalUserData {
  email: string;
  isAdmin: boolean;
  createdAt: number;
  updatedAt: number;

  // TO DEFINE
  starterId?: string;
}

export interface AdditionalUserData {
  pseudo: string;

  // TO DEFINE
  character?: string;
}
