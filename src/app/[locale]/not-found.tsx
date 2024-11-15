import Link from "next/link";

async function NotFound() {
  return (
    <div className="flex h-[calc(100vh-80px)] w-full flex-col items-center justify-center py-24">
      <h1 className="text-center font-bold">
        <p className="text-destructive mb-2 text-8xl">404</p>
        <p className="text-5xl">Error</p>
        <Link href="/" className="text-primary">
          Return Home
        </Link>
      </h1>
    </div>
  );
}

export default NotFound;