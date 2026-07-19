import Link from "next/link";

export default function NotFound() {
  return (
    <div className="notFound">
      <h1 className="code">404</h1>
      <p className="note">This frame doesn&apos;t exist</p>
      <Link href="/" className="back">
        Back to work
      </Link>
    </div>
  );
}
