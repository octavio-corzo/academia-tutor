import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore/lite";
import { db } from "../firebaseConfig";
import { defineStore } from "pinia";
import { auth } from "../firebaseConfig";
import { nanoid } from "nanoid";
import router from "../router";

export const userDatabaseStore = defineStore("database", {
  state: () => ({
    documents: [],
    loadingDoc: false,
    loading: false,
  }),
  actions: {
    async getNotes() {
      if (this.documents.length !== 0) {
        return;
      }

      this.loadingDoc = true;
      try {
        const q = query(
          collection(db, "notes"),
          where("user", "==", auth.currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          console.log(doc.id, doc.data());
          this.documents.push({
            id: doc.id,
            ...doc.data(),
          });
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingDoc = false;
      }
    },
    async addNote(name) {
      this.loading = true;
      try {
        const objetoDoc = {
          name: name,
          short: nanoid(6),
          user: auth.currentUser.uid,
        };
        await setDoc(doc(db, "notes", objetoDoc.short), objetoDoc);
        this.documents.push({
          ...objetoDoc,
          id: objetoDoc.short,
        });
      } catch (error) {
        console.log(error.code);
        return error.code;
      } finally {
        this.loading = false;
      }
    },
    async leerNote(id) {
      this.loadingDoc = true;
      try {
        const docRef = doc(db, "notes", id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          throw new Error("No existe el documento.");
        }

        if (docSnap.data().user !== auth.currentUser.uid) {
          throw new Error("No tiene acceso a este documento.");
        }

        return docSnap.data().name;
      } catch (error) {
        console.log(error.mesaage);
      } finally {
        this.loadingDoc = false;
      }
    },
    async updateNote(id, name) {
      this.loading = true;
      try {
        const docRef = doc(db, "note", id);

        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          throw new Error("No existe el documento.");
        }

        if (docSnap.data().user !== auth.currentUser.uid) {
          throw new Error("No tiene acceso a este documento.");
        }

        await updateDoc(docRef, {
          name: name,
        });

        this.documents = this.documents.map((item) =>
          item.id == id ? { ...item, name: name } : item
        );
        router.push("/");
      } catch (error) {
        console.log(error.mesaage);
        return error.mesaage;
      } finally {
        this.loading = false;
      }
    },
    async deleteNote(id) {
      this.loadingDoc = true;
      try {
        const docRef = doc(db, "note", id);

        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          throw new Error("No existe el documento.");
        }

        if (docSnap.data().user !== auth.currentUser.uid) {
          throw new Error("No tiene acceso a este documento.");
        }

        await deleteDoc(docRef);
        this.documents = this.documents.filter((item) => item.id !== id);
      } catch (error) {
        console.log(error.code);
        return error.mesaage;
      } finally {
        this.loadingDoc = false;
      }
    },
  },
});
