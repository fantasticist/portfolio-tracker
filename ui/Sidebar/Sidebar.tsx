'use client';

import { Setting } from '@/components/icons/Setting';
import { Squares } from '@/components/icons/Squares';
import { type NavLinkProps, NavLink } from './NavLink';

const MENU: NavLinkProps[] = [
  {
    name: 'Dashboard',
    slug: 'dashboard',
    icon: Squares,
  },
  {
    name: 'Setting',
    slug: 'setting',
    icon: Setting,
  },
];

export function Sidebar() {
  return (
    <aside className="w-64" aria-label="Sidebar">
      <div className="overflow-y-auto py-4 px-3 rounded">
        <a href="https://flowbite.com"></a>
        <ul className="space-y-2">
          {MENU.map((item) => (
            <li key={item.slug}>
              <NavLink {...item} />
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
