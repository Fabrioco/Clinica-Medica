import { redirect } from "next/navigation";

export default function dashboard() {
  redirect("/auth");
}
