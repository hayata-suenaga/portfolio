import { api } from "@/trpc/react";

export default function Hello() {
  const { data } = api.hello.sayHello.useQuery({ text: "friends!" });

  return <div>{data?.greeting}</div>;
}
