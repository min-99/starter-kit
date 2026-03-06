import Link from 'next/link';
import styles from './Header.module.css';

interface NavItem {
  label: string;
  href: string;
}

interface HeaderProps {
  title?: string;
  navItems?: NavItem[];
}

export default function Header({
  title = 'Starter Kit',
  navItems = DEFAULT_NAV_ITEMS,
}: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link className={styles.logo} href="/">
          {title}
        </Link>
        <nav aria-label="주 내비게이션" className={styles.nav}>
          {navItems.map((item) => (
            <Link key={item.href} className={styles.navLink} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

const DEFAULT_NAV_ITEMS: NavItem[] = [
  { label: '홈', href: '/' },
  { label: '예제', href: '/example' },
];
