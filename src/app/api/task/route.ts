import { db } from "@/firebase";
import {
  collection,
  addDoc,
  arrayUnion,
  doc,
  updateDoc,
  getDocs,
} from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const task = await req.json();
  const taskRef = collection(db, "tasks");
  const docRef = await addDoc(taskRef, task);

  //update user task list with task id
  const userRef = collection(db, "users");
  const userDocRef = doc(userRef, process.env.GOOGLE_STORAGE_USER_ID);
  await updateDoc(userDocRef, {
    taskList: arrayUnion(docRef.id),
  });

  return NextResponse.json({ taskId: docRef.id });
}

/**
 * Get all tasks
 * @param start - start date
 * @param end - end date
 * @param status - status of the task
 * @returns
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const start = searchParams.get("start");
  const end = searchParams.get("end");
  const status = searchParams.get("status");

  const taskRef = collection(db, "tasks");
  const tasks = await getDocs(taskRef);
  let filtered = tasks.docs.map((doc) => doc.data());

  if (start && end) {
    // Both start and end provided
    filtered = filtered.filter((task) => {
      if (!task.date) return false;
      return task.date >= start && task.date <= end;
    });
  } else if (start) {
    // Only start provided
    filtered = filtered.filter((task) => {
      if (!task.date) return false;
      return task.date >= start;
    });
  } else if (end) {
    // Only end provided
    filtered = filtered.filter((task) => {
      if (!task.date) return false;
      return task.date <= end;
    });
  }

  if (status) {
    filtered = filtered.filter((task) => task.status === status);
  }

  return NextResponse.json(filtered);
}
