import { NavLink } from "./NavLink/NavLink";

const Navbar = () => {
    const links = [
        {title: 'home', path: '/'},
        {title: 'about', path: '/about'},
        {title: 'terms', path: '/terms'},
        {title: 'contact', path: '/contact'}
    ];

  return (
    <nav
      id="main-nav"
      className="mt-6 w-full flex-col items-center justify-center border-t-2 border-blue-100 lg:flex-row bg-transparent lg:border-none lg:bg-white lg:dark:bg-blue-900 hidden lg:flex"
      aria-label="Main"
    >
      {links.map((link, index) => (
        <NavLink key={`${index}-4f99437d-b71c-4b1c-95d8-76cdc779f704`} href={link.path} title={link.title} />
      ))}
    </nav>
  );
};

export default Navbar;
