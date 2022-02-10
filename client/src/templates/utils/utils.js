export const searchEmail = (email, search) =>
  email.Subject.toLowerCase().includes(search) ||
  email.snippet.toLowerCase().includes(search) ||
  email.From.toLowerCase().includes(search);
