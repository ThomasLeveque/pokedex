export const fromPseudoToCredentials = (pseudo: string): { email: string; password: string } => {
  const formatedPseudo = pseudo.trim().replace(/\s/g, '-');
  const email = `${formatedPseudo}@gmail.com`;
  const password = `${formatedPseudo}*${process.env.NEXT_PUBLIC_PASSWORD_TOKEN}`;
  return {
    email,
    password,
  };
};

export const fromEmailToPseudo = (email: string): string => {
  return email.split('@')[0].replace(/-/g, ' ');
};
