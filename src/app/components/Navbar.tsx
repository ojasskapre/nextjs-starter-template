import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-primary text-foreground">
      <Link href="/">
        <div className="text-2xl font-bold ml-16">Next.js Starter Template</div>
      </Link>
      <div>
        <Link href="/signup">
          <button className="hover:bg-card-hover text-foreground font-bold py-2 px-4 rounded mr-2">
            Sign Up
          </button>
        </Link>
        <Link href="/signin">
          <button className="bg-accent hover:bg-accent-hover text-accent-foreground font-bold py-2 px-4 rounded">
            Sign In
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
