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
export async function signIn(email, password) {
    console.log("signing in ");
    try {
        const session = await account.createEmailPasswordSession(email, password);
        console.log("session created:", session);
        return session;
    } catch (error) {
        console.error("Error signing in:", error);
        throw new Error(error.message);
    }
}