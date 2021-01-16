export const fromPseudoToCredentials = (pseudo: string): { email: string; password: string } => {
  const formatedPseudo = pseudo.trim().replace(/\s/g, '-').toLowerCase();
  const email = `${formatedPseudo}@gmail.com`;
  const password = `${formatedPseudo}*${process.env.NEXT_PUBLIC_PASSWORD_TOKEN}`;
  return {
    email,
    password,
  };
};
