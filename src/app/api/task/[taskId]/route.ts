import { db } from "@/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { taskId: string } }
) {
  const { taskId } = await params;
  const task = await req.json();
  const taskRef = collection(db, "tasks");
  await updateDoc(doc(taskRef, taskId), task);
  return NextResponse.json(task);
}

export async function GET(
  req: Request,
  { params }: { params: { taskId: string } }
) {
  //implement get task by id
  const { taskId } = await params;
  const taskRef = collection(db, "tasks");
  const task = await getDoc(doc(taskRef, taskId));
  return NextResponse.json(task.data());
}

export async function DELETE(
  req: Request,
  { params }: { params: { taskId: string } }
) {
  const { taskId } = await params;
  const taskRef = collection(db, "tasks");
  await deleteDoc(doc(taskRef, taskId));
  return NextResponse.json({ message: "Task deleted" });
}
