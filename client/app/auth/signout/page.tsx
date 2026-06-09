"use client";
import { useRequest } from "@/hooks/useRequest";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignoutPage() {
  const router = useRouter();
  const { doRequest } = useRequest({
    url: "/api/users/signout",
    method: "post",
    body: {},
    onSuccess: () => {
      window.location.href = "/";
    },
  });

  useEffect(() => {
    doRequest();
  }, [doRequest]);
  return <div>Signout .....</div>;
}
