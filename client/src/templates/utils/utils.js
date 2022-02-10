export const searchEmail = (email, search) =>
  email.Subject.toLowerCase().includes(search) ||
  email.snippet.toLowerCase().includes(search) ||
  email.From.toLowerCase().includes(search);

const returnOpposite = (direction, val) =>
  direction ? 0 - Math.abs(val) : val;

export const sortEmails = (emails, sortBy, sortDirection) => {
  if (sortBy === "Date") {
    return emails.sort((a, b) => {
      if (Date.parse(a.Date) < Date.parse(b.Date)) {
        return returnOpposite(sortDirection, -1);
      }
      if (Date.parse(a.Date) > Date.parse(b.Date)) {
        return returnOpposite(sortDirection, 1);
      }
      return 0;
    });
  } else {
    return emails.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) {
        return returnOpposite(sortDirection, -1);
      }
      if (a[sortBy] > b[sortBy]) {
        return returnOpposite(sortDirection, 1);
      }
      return 0;
    });
  }
};
