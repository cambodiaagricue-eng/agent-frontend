import { redirect } from "next/navigation";

export default function AgentFaceAuthRedirect() {
  redirect("/auth/login");
}
