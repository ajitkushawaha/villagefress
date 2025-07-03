// firestoreService.ts

import { doc, setDoc, addDoc, collection, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

interface User {
  uid: string;
  displayName?: string;
  email?: string;
  phoneNumber?: string;
}

interface Store {
  id?: string;
  name?: string;
  ownerName?: string;
  phone?: string;
  address?: string;
  whatsappNumber?: string;
}

interface Order {
  userId: string;
  storeId: string;
  items: any[]; // You can define a specific type for items
  total: number;
}

// ✅ Save new or existing user

export async function saveUserToFirestore(user: any) {
  const userRef = doc(db, 'users', user.uid);
  const docSnap = await getDoc(userRef);

  const userData = {
    name: user.displayName || 'User',
    email: user.email || '',
    phone: user.phoneNumber || '',
    updatedAt: new Date(),
  };

  if (!docSnap.exists()) {
    // 👇 Only set admin to false when user is first created
    await setDoc(userRef, {
      ...userData,
      admin: false,
      createdAt: new Date(),
    });
  } else {
    // 👇 Merge other fields, but don't touch admin
    await setDoc(userRef, userData, { merge: true });
  }
}


// ✅ Save store (you can pass a dynamic storeId if needed)
export async function saveStoreToFirestore(store: Store) {
  const storeRef = doc(db, 'stores', store.id || 'village-fresh');
  await setDoc(storeRef, {
    name: store.name || 'Village Store',
    ownerName: store.ownerName || 'Store Owner',
    phone: store.phone || '+9198989898',
    address: store.address || 'Khukhundoo Store',
    whatsappNumber: store.whatsappNumber || '+917617028576',
    updatedAt: new Date(),
  }, { merge: true });
}


