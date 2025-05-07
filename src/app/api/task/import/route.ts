import { db } from "@/firebase";
import { arrayUnion, doc, writeBatch } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { NextResponse } from "next/server";
import { task } from "@/schema";
import { z } from "zod";

export async function POST(req: Request) {
  const tasks = await req.json();
  const taskRef = collection(db, "tasks");
  const userRef = collection(db, "users");
  console.log(taskRef, userRef);
  const userDocRef = doc(userRef, process.env.GOOGLE_STORAGE_USER_ID);
  //use batch to add tasks
  const batch = writeBatch(db);
  tasks.forEach((t: z.infer<typeof task>) => {
    const docRef = doc(taskRef);
    batch.update(userDocRef, {
      taskList: arrayUnion(docRef.id),
    });
    t.id = docRef.id;
    batch.set(docRef, t);
  });
  await batch.commit();
  return NextResponse.json({ message: "Tasks imported successfully" });
}
