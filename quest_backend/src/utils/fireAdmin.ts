import * as admin from 'firebase-admin';

const serviceAccountStr=process.env.GOOGLE_SERVICE_ACCOUNT_KEY as string;
const serviceAccount = JSON.parse(serviceAccountStr);


// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    // Optionally include databaseURL if using Firebase Realtime Database
    // databaseURL: "https://<your-database-name>.firebaseio.com"
  });
}

// Export the Auth instance
export const auth = admin.auth();
