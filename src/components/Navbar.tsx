import { cn, pressable } from '@coinbase/onchainkit/theme';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  GITHUB_LINK,
  ONCHAINKIT_LINK,
  TEMPLATE_LINK,
  TWITTER_LINK,
} from 'src/links';
import { ExternalLinkSvg } from 'src/svg/ExternalLinkSvg';
import { MenuSvg } from 'src/svg/MenuSvg';
import OnchainKitShopSvg from 'src/svg/OnchainKitShopSvg';
import type { NavbarLinkReact } from 'src/types';
import ThemeToggle from './ThemeToggle';

function NavbarLink({ link, label, onClick }: NavbarLinkReact) {
  return (
    <li
      className={cn(
        'flex cursor-pointer items-center justify-center gap-2 rounded p-1',
        pressable.default,
      )}
    >
      <a
        href={link}
        className="ock-text-foreground flex items-center text-xs"
        target="_blank"
        rel="noreferrer"
        onClick={onClick}
      >
        {label}
        <span className="pl-1">
          <ExternalLinkSvg />
        </span>
      </a>
    </li>
  );
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuId = 'onchain-menu';

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleOutsideClick = (event: MouseEvent) => {
      if (!headerRef.current) return;
      if (!headerRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <header
      className="-mx-[50vw] fixed top-7 right-1/2 left-1/2 z-20 h-11 w-screen border-gray-200/80 border-b bg-white/90 backdrop-blur-md"
      ref={headerRef}
    >
      <div className="mx-auto flex h-full max-w-5xl items-center px-4 lg:px-6">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center space-x-3 text-gray-900 dark:text-gray-100">
            <OnchainKitShopSvg />
            <span className="ock-bg-alternate ock-text-foreground rounded px-2 py-0.5 font-medium text-[11px] tracking-wide">
              Template
            </span>
          </div>
          <nav className="hidden md:block">
            <ul className="flex space-x-5">
              <NavbarLink link={TEMPLATE_LINK} label="FORK THIS TEMPLATE" />
              <NavbarLink link={ONCHAINKIT_LINK} label="ONCHAINKIT" />
              <NavbarLink link={TWITTER_LINK} label="X" />
            </ul>
          </nav>
          <div className="hidden md:flex items-center">
            <ThemeToggle />
          </div>
          <button
            type="button"
            className={cn('md:hidden', pressable.default)}
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            aria-controls={menuId}
          >
            <MenuSvg />
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="bg-[white] md:hidden" id={menuId}>
          <ul className="flex flex-col items-start space-y-2 px-4 py-2">
            <NavbarLink
              link={TEMPLATE_LINK}
              label="FORK THIS TEMPLATE"
              onClick={() => setIsMenuOpen(false)}
            />
            <NavbarLink
              link={ONCHAINKIT_LINK}
              label="ONCHAINKIT"
              onClick={() => setIsMenuOpen(false)}
            />
            <NavbarLink
              link={GITHUB_LINK}
              label="GITHUB"
              onClick={() => setIsMenuOpen(false)}
            />
            <NavbarLink
              link={TWITTER_LINK}
              label="X"
              onClick={() => setIsMenuOpen(false)}
            />
            <li className="pt-2">
              <ThemeToggle />
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
