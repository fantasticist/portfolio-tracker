'use client';

import clsx from 'clsx';
import { Squares } from '@/components/icons/Squares';
import Link from 'next/link';
import { useSelectedLayoutSegments } from 'next/navigation';

export interface NavLinkProps {
  name: string;
  slug: string;
  icon: any;
  description?: string;
  isDisabled?: boolean;
}

export function NavLink({ name, slug, icon: Icon }: NavLinkProps) {
  const [selectedLayoutSegments] = useSelectedLayoutSegments();
  const isActive = slug === selectedLayoutSegments;

  return (
    <Link
      href={`/${slug}`}
      className={clsx(
        'flex items-center p-2 text-base font-normal text-zinc-900 rounded-lg dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700',
        {
          'text-zinc-600 dark:text-zinc-400': !isActive,
          'text-zinc-900 dark:text-white': isActive,
        },
      )}
    >
      <Icon
        className="w-6 h-6 mr-3 text-zinc-500 transition duration-75 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white"
        aria-hidden="true"
      />
      <span>{name}</span>
    </Link>
  );
}
