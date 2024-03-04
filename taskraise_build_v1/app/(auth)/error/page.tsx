import Link from "next/link";

export default function ErrorPage() {
  return (
    <p className="">
      Sorry, something went wrong.{" "}
      <Link className="underline text-blue-500" href={"/"}>
        Go home
      </Link>
    </p>
  );
}
