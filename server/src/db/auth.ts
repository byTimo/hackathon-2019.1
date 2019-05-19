import firestore from "firebase-admin";

export function createAuth(auth: firestore.auth.Auth) {
    const create = async (email: string, password: string): Promise<string> => {
        const user = await auth.createUser({
            email,
            password,
            displayName: email,
            emailVerified: false,
        });

        return user.uid;
    }

    const login = async (email: string, password: string): Promise<string> => {
        const user = await auth.getUserByEmail(email);
        return user.uid;
    }

    return {
        create,
        login,
    }
}