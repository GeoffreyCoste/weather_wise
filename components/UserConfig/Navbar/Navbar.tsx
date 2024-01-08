import { NavLink } from "./NavLink/NavLink"

const Navbar = () => {

  const links = [
      {title: 'account', path: '/user/config/account'},
      {title: 'profile', path: '/user/config/profile'},
      {title: 'settings', path: '/user/config/settings'}
  ];

  return (
    <nav
      id="config-nav"
      className="w-full flex justify-between lg:justify-normal lg:flex-col"
      aria-label="config navbar"
    >
      {links.map((link, index) => (
        <NavLink key={`${index}-4f99437d-b71c-4b1c-95d8-76cdc779f704`} href={link.path} title={link.title} />
      ))}
    </nav>
  );
};

export default Navbar;