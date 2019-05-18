const admin = require('firebase-admin');
const cert = require("./alco-trip-firebase-adminsdk-w1ptt-e056550f72.json");

const app = admin.initializeApp({
    credential: admin.credential.cert(cert),
    databaseURL: "https://alco-trip.firebaseio.com"
});

export async function test() {
    let user = await app.auth().getUserByEmail("user@example.com");

    if (!user) {
        user = await app.auth().createUser({
            email: 'user@example.com',
            emailVerified: false,
            phoneNumber: '+11234567890',
            password: 'secretPassword',
            displayName: 'John Doe',
            photoURL: 'http://www.example.com/12345678/photo.png',
            disabled: false
        })
    }

    return user;
}

export async function lol() {
    app.firestore()
}