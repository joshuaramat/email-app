export default (emails) => {
  const emailsArray = emails
    .split(',')
    .map(email => email.trim())
    .filter(email => email.length > 0)

  const invalidEmails = emailsArray.filter(email => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    return !emailRegex.test(email);
  });

  if (invalidEmails.length > 1) {
    return `These emails are invalid: ${invalidEmails}`;
  } else if (invalidEmails.length === 1) {
    return `This email is invalid: ${invalidEmails}`;
  }

  return;
}