import { redirect } from "next/navigation";

export default function AgentVerifyRedirect() {
  redirect("/auth/login");
}
