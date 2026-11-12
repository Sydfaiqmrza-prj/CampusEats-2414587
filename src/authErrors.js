const MESSAGES = {
  'auth/invalid-credential': 'Wrong email or password.',
  'auth/invalid-email': 'That email address is not valid.',
  'auth/email-already-in-use': 'An account with this email already exists. Log in instead.',
  'auth/weak-password': 'Password must be at least 6 characters.',
  'auth/operation-not-allowed': 'Email/password sign-in is disabled. Enable it in Firebase Authentication settings.',
  'auth/configuration-not-found': 'Firebase Authentication is not configured for this project.',
  'auth/invalid-api-key': 'Firebase rejected the API key. Check your Firebase configuration.',
  'auth/too-many-requests': 'Too many attempts. Wait a minute and try again.',
  'auth/popup-closed-by-user': 'Google sign-in was cancelled.',
  'auth/popup-blocked': 'Your browser blocked the Google pop-up. Allow pop-ups for localhost.',
  'auth/network-request-failed': 'No connection. Check your internet and try again.',
}

export function authErrorMessage(error) {
  return MESSAGES[error.code] ?? `Unable to complete authentication${error.code ? ` (${error.code})` : ''}. Check the Firebase Authentication setup and try again.`
}