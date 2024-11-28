import {
    Account,
    Avatars,
    Client,
    Databases,
    ID,
    Query,
    Storage,
} from "react-native-appwrite";

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('6748466e003319f440ea');


export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    Platform: 'com.paranie.aora',
    projectId: '6748466e003319f440ea',
    databaseId: '674848d3003567521272',
    userCollectionId: '6748490d000a1840ca79',
    videoCollectionId: '674849450033b16e8608',
    storageId: '67484b20002eab71a743'
}

const account = new Account(client);
const storage = new Storage(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export async function createUser(email, password, username) {
    console.log("sample ", email, password, username);

    const account = new Account(client);
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        );

        if (!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(username);

        // Sign in the user
        await account.createEmailPasswordSession(email, password);

        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email: email,
                username: username,
                avatar: avatarUrl,
            }
        );

        console.log("new user : ", newUser);

        return newUser;
    } catch (error) {
        throw new Error(error);
    }
}

// Sign In
// export async function signIn(email, password) {
//     console.log("signing in ");
//     try {
//         const session = await account.createEmailPasswordSession(email, password);
//         console.log("session created:", session);
//         return session;
//     } catch (error) {
//         console.error("Error signing in:", error);
//         throw new Error(error.message);
//     }
// }

// Get Account
export async function getAccount() {
    try {
        const currentAccount = await account.get();

        return currentAccount;
    } catch (error) {
        throw new Error(error);
    }
}

// Get current User
// export async function getCurrentUser() {
//     try {
//         const currentAccount = await getAccount();
//         if (!currentAccount) throw Error;

//         const currentUser = await databases.listDocuments(
//             appwriteConfig.databaseId,
//             appwriteConfig.userCollectionId,
//             [Query.equal("accountId", currentAccount.$id)]
//         );

//         if (!currentUser) throw Error;

//         return currentUser.documents[0];
//     } catch (error) {
//         console.log(error);
//         return null;
//     }
// }

// appwrite.js - Add these new functions
export async function checkSession() {
    try {
        return await account.getSession('current');
    } catch (error) {
        return null;
    }
}

export async function deleteSession() {
    try {
        await account.deleteSession('current');
    } catch (error) {
        console.error("Error deleting session:", error);
    }
}

// Update signIn function
export async function signIn(email, password) {
    console.log("signing in");
    try {
        // Check and delete existing session
        const existingSession = await checkSession();
        if (existingSession) {
            await deleteSession();
        }

        // Create new session
        const session = await account.createEmailPasswordSession(email, password);
        console.log("session created:", session);
        return session;
    } catch (error) {
        console.error("Error signing in:", error);
        throw error;
    }
}

// Update getCurrentUser function
export async function getCurrentUser() {
    try {
        const currentAccount = await getAccount();
        if (!currentAccount) return null;

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal("accountId", currentAccount.$id)]
        );

        if (!currentUser?.documents?.length) return null;

        return currentUser.documents[0];
    } catch (error) {
        console.error("Error getting current user:", error);
        return null;
    }
}