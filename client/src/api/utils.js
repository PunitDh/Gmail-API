export const extractData = (emailsArray) => {
  const emails = emailsArray.map((email) => {
    let props = {};

    email.messages[0].payload.headers.forEach((header) => {
      props[header.name] = header.value;
    });
    props.id = email.id;
    props.snippet = email.messages[0].snippet;

    return props;
  });
  return emails;
};
