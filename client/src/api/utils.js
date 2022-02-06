export const extractData = (emailsArray) => {
  const emails = emailsArray.map((email) => ({
    id: email.data.id,
    from: email.data.messages[0].payload.headers[0].value,
    date: email.data.messages[0].payload.headers[1].value,
    subject: email.data.messages[0].payload.headers[2].value,
    snippet: email.data.messages.map((message) => message.snippet),
  }));
  console.log(emails);
  return emails;
};
