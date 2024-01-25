import Link from "next/link";

export default ({ currentUser }) => {
  return (
    <header>
      <nav className="navbar py-2 px-4 bg-light">
        <Link href="/" className="navbar-brand">
          GitTix
        </Link>
        <div className="d-flex justify-content-end">
          <ul className="nav d-flex align-items-center">
            {currentUser ? "Sign Out" : "Sign In/Up"}
          </ul>
        </div>
      </nav>
    </header>
  );
};
