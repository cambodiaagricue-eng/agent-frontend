import { redirect } from "next/navigation";

export default function AgentRegisterRedirect() {
  redirect("/auth/login");
}
