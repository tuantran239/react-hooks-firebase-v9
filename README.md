# React-hooks-firebase-v9

## Installation

Use npm to install react-hooks-firebase-v9

```bash
npm install react-hooks-firebase-v9
```
## Update v0.2.3
- Add Timestamp from firebase
```typescript
import { Timestamp, serverTimestamp } from 'react-hooks-firebase-v9'
```
- Add where queryPagination
```typescript
 queryPagination({
    collection,
    pagination: {
      limit: 100,
      page: 1,
      orderBy: [["age", "desc"]],
      where: [["age", ">=", 20]] //new feature
    },
      onCompleted(data) {
        console.log(mapToDocumentData(data.docs));
      },
      onError(error) {
        alert(error.message);
      },
    });
```

## Update new feature v0.2.0
useAuth: update signin apple, microsoft for signInWithProvider.
```typescript
const { data, error } = await signInWithProviderAsync(
      auth,
      "google", /* google | github | facebook | twitter | apple | microsoft */
      "popup" /* popup or redirect */
);
```
##
useFireStore: change syntax where, orderBy in queryDoc
```typescript
//old 
where: [{ fieldPath: "age", opStr: ">=", value: 22 }]
//new
where: [["age", ">=", 22]]

//old
orderBy: { fieldPath: "age", directionStr: "desc"}
//new
orderBy: [["age", "desc"]]
```
##
useFireStore: update limitToLast, startAt, startAfter, endAt, endBefore in queryDoc
```typescript
query({
  collection,
  constraints: {
     where: [["age", ">=", 22]], //WhereType[]
     orderBy: [["age", "desc"]], //OrderByType[]
     limit: 1, // number
     limitToLast: 3, //number,
     startAt: [1], //DocumentSnapshot<unknown> | unknown[]
     startAfter: [1], //DocumentSnapshot<unknown> | unknown[]
     endAt: [1], //DocumentSnapshot<unknown> | unknown[]
     endBefore: [1], //DocumentSnapshot<unknown> | unknown[]
    },
  });
```
##
useFireStore: update funtion convertToDocumentData(), mapToDocumentData()
```typescript

import { useFireStore } from "react-hooks-firebase-v9";

interface Person {
  name: string;
  age: number;
}

const { createDocRef, getDocAsync, createCollection, queryDocAsync, 
mapToDocumentData, convertToDocumentData } = useFireStore()

//convertToDocumentData: when use getDoc return one doc
const doc = createDocRef("persons", "p1");
const {data: snapshot, error} = await getDocAsync(doc);
const person = convertToDocumentData<Person>(person);

//mapToDocumentData: when use queryDoc return array docs
const collection = createCollection("persons");
const {data: querySnapshot, error} = await queryDocAsync(collection, {
   orderBy: [["age", "desc"]],
   limit: 2
});
const persons = mapToDocumentData<Person>(querySnapshot.docs);

```
useFireStore: update feature queryPagination use query with pagination
```typescript
import { useFireStore } from "react-hooks-firebase-v9";

/* use with callback */
const { createCollection, queryPaginationCallback, mapToDocumentData } = useFireStore();

const [queryPagination, { loading }] = queryPaginationCallback();

const onQueryHandler = () => {
 const collection = createCollection("persons");
 queryPagination({
    collection,
    pagination: {
      limit: 2,
      orderBy: [["age", "desc"]],
      page: 1,
    },
    onCompleted(data) {
        console.log(mapToDocumentData(data.docs));
    },
    onError(error) {
        alert(error.message);
    },
 });
}

/* use with async */
const { createCollection, queryPaginationAsync, mapToDocumentData } = useFireStore();

const onQueryHandler = () => {
 const collection = createCollection("persons");
 const { error, data } = await queryPaginationAsync(collection, {
      limit: 2,
      orderBy: [["age", "desc"]],
      page: 3,
  });
  if(error) {
      alert(error);
  }
 console.log(mapToDocumentData(data!.docs));
}
```

## Usage

index.tsx

```typescript
import { FirebaseProvider, createApp } from "react-hooks-firebase-v9";

const app = createApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
});

<FirebaseProvider app={app}>
  <App />
</FirebaseProvider>;
```
## Hooks 
useAuth(): use auth in firebase

useFireStore(): use cloud firestore in firebase

useStorage(): use stoorage in firebase

useTransaction(): group auth, firestore, storage in one transaction handle many async on time

useDatabase: update later

## useAuth()

createUserWithEAP: create user with email and password

```typescript
import { useAuth } from "react-hooks-firebase-v9";

/* use with callback */
const { createUserWithEAPCallback } = useAuth();
const [createUser, { loading, data, error }] = createUserWithEAPCallback();

console.log(data);
console.log(error);
console.log(loading);

const onClickHandler = () => {
  createUser({
    value: {
      email: "exmaple@gmail.com",
      password: "123456",
    },
    onCompleted(data) {
      console.log(data);
    },
    onError(error) {
      alert(error);
    },
  });
};

/* use with async */
const { auth, createUserWithEAPAsync } = useAuth();

const onClickHandler = async () => {
  const { data, error } = await createUserWithEAPAsync(
    auth,
    "example@gmail.com",,
    "123456"
  );
  if (error) {
    alert(error);
  }
  console.log(data);
};
```

signInWithEAP: signin with email and password

```typescript
import { useAuth } from "react-hooks-firebase-v9";

/* use with callback */
const { signInWithEAPCallback } = useAuth();
const [signIn, { loading, data, error }] = signInWithEAPCallback();

console.log(data);
console.log(error);
console.log(loading);

const onClickHandler = () => {
  signIn({
    value: {
      email: "example@gmail.com",
      password: "123456",
    },
    onCompleted(data) {
      console.log(data);
    },
    onError(error) {
      alert(error);
    },
  });
};

/* use with async */
const { auth, signInWithEAPAsync } = useAuth();

const onClickHandler = async () => {
  const { data, error } = await signInWithEAPAsync(
    auth,
    "example@gmail.com",
    "123456"
  );
  if (error) {
    alert(error);
  }
  console.log(data);
};
```

signInWithProvider: signin with provider google, github,...

```typescript
import { useAuth } from "react-hooks-firebase-v9";

/* use with callback */
same other callback in useAuth

/* use with async */
const { auth, signInWithProviderAsync } = useAuth();

const onClickHandler = async () => {
    const { data, error } = await signInWithProviderAsync(
      auth,
      "google", /* google | github | facebook | twitter | apple | microsoft */
      "popup" /* popup or redirect */
    );
    if (error) {
      alert(error);
    }
    console.log(data);
};
```

getAuth: get user login

```typescript
import { useAuth } from "react-hooks-firebase-v9";

/* use with callback */
same other callback in useAuth

/* use with async */
const { auth, getAuthAsync } = useAuth();

useEffect(() => {
  const get = async () => {
   const { data, error } = await getAuthAsync(auth);
     if (error) {
        alert(error);
      }
     console.log(data);
    };
    get();
 }, []);
```

signOut

```typescript
import { useAuth } from "react-hooks-firebase-v9";

/* use with callback */
const { signOutCallback } = useAuth();
const [signOut, { loading, data, error }] = signOutCallback();

console.log(data);
console.log(error);
console.log(loading);

const onClickHandler = () => {
    signOut({
      onCompleted() {
        alert("success");
      },
      onError(error) {
        alert(error);
      },
    });
 };

/* use with async */
same other async in useAuth
```

\*sendEmailVerification: send link verifired mail

\*sendPasswordResetEmail: send link reset password

\*updateProfileAsync: update displayName or photoUrl

## useFireStore()

addDoc: add new doc

```typescript
import { useFireStore } from "react-hooks-firebase-v9";

/* use with callback */
const { addDocCallback, createCollection } = useFireStore();
const [addDoc, { loading, data, error }] = addDocCallback();

console.log(data);
console.log(error);
console.log(loading);

const onClickHandler = () => {
  const collection = createCollection("test");
  addDoc({
    collection,
    value: {
      title: "test",
      content: "test content",
    },
    onCompleted(data) {
      console.log(data);
    },
    onError(error) {
      alert(error);
    },
  });
};

/* use with async */
const { addDocAsync, createCollection } = useFireStore();

const onClickHandler = async () => {
  const collection = createCollection("test");
  const { data, error } = await addDocAsync(collection, {
    title: "test1",
    content: "test content",
  });
  if (error) {
    alert(error);
  }
  console.log(data);
};
```

setDoc: add new doc if not exist or update doc if exist

```typescript
import { useFireStore } from "react-hooks-firebase-v9";

/* use with callback */
same other callback in useFireStore

/* use with async */
const { setDocAsync, createDocRef } = useFireStore();

const onClickHandler = async () => {
    const doc = createDocRef("test", "testdoc");
    const { data, error } = await setDocAsync(doc, {
      title: "test2",
      content: "test content",
    });
    if (error) {
      alert(error);
    }
    console.log(data);
};

```

getDoc: get one doc

```typescript
import { useFireStore } from "react-hooks-firebase-v9";

/* use with callback */
same other callback in useFireStore

/* use with async */
const { getDocAsync, createDocRef } = useFireStore();

const onClickHandler = async () => {
   const doc = createDocRef("test", "testdoc");
   const { data, error } = await getDocAsync(doc);
   if (error) {
      alert(error);
   }
   console.log(data?.data());
};

```

queryDoc: query docs

```typescript
import { useFireStore } from "react-hooks-firebase-v9";

/* use with callback */
same other callback in useFireStore

/* use with async */
const { queryDocAsync, createCollection } = useFireStore();

const onClickHandler = async () => {
   const collection = createCollection("persons");
   const { data: docs, error } = await queryDocAsync(collection, {
      where: [["age", ">=", 22 ]],
      limit: 2
    });
   if (error) {
      alert(error);
   }
   console.log(docs);
};

```
queryPagination: use query with pagination
```typescript
import { useFireStore } from "react-hooks-firebase-v9";

/* use with callback */
const { createCollection, queryPaginationCallback, mapToDocumentData } = useFireStore();

const [queryPagination, { loading }] = queryPaginationCallback();

const onQueryHandler = () => {
 const collection = createCollection("persons");
 queryPagination({
    collection,
    pagination: {
      limit: 2,
      orderBy: [["age", "desc"]],
      page: 1,
    },
    onCompleted(data) {
        console.log(mapToDocumentData(data.docs));
    },
    onError(error) {
        alert(error.message);
    },
 });
}

/* use with async */
const { createCollection, queryPaginationAsync, mapToDocumentData } = useFireStore();

const onQueryHandler = () => {
 const collection = createCollection("persons");
 const { error, data } = await queryPaginationAsync(collection, {
      limit: 2,
      orderBy: [["age", "desc"]],
      page: 3,
  });
  if(error) {
      alert(error);
  }
 console.log(mapToDocumentData(data!.docs));
}
```

\*updateDoc: update doc

\*deleteDoc: delete doc

## useStorage()

uploadFile: only uploadFile have progess, pause, resume, cancel.

```typescript
import { useStorage } from "react-hooks-firebase-v9";

const [file, setFile] = useState<any>(null);
const { uploadFileCallback, createStorageRef } = useStorage();
const [uploadFile, { loading, data, error, progress, pause, resume, cancel }] =
uploadFileCallback();

const handleChange = (f: any) => {
  setFile(f);
};

console.log(data);
console.log(error);
console.log(loading);
console.log(progress); // update progress

const onPause = () => pause!(); // update pause
const onResume = () => resume!(); // update resume
const cancel = () => cancel!(); // update cancel

const onClickHandler = () => {
  const ref = createStorageRef("images/" + file.name);
  uploadFile({
    ref,
    file,
    onCompleted(url) {
      console.log(url);
    },
    onError(error) {
      alert(error);
    },
  });
};
```

\*downloadUrl: get url file

\*deleteFile: delete one file

\*deleteManyFile: delete many file

\*listFile: list files

## useTransaction()

use transaction run many async in one transaction

```typescript
import { useTransaction } from "react-hooks-firebase-v9";

const {
  onTransactionCallback,
  auth: a,
  createDocRef,
} = useTransaction();

const [onTransaction, { loading, error }] = onTransactionCallback();

console.log(error);
console.log(loading);

const onClickHandler = async () => {
  onTransaction({
    async onRun({ auth, firestore, storage }) {
      const user = await auth.signInWithProvider(a, "google", "popup");
      const doc = createDocRef("users", user.uid);
      await firestore.setDoc(doc, {
        displayName: user.displayName,
        photoUrl: user.photoURL,
      });
    },
    onError(error) {
      alert(error);
    },
  });
};
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
