const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(email) {
  return emailRegex.test(email);
}

export function isTeacher(loggedInUser) {
  return loggedInUser?.user.type === 'teacher';
}
