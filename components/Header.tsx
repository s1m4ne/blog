// components/Header.tsx
import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'

/**
 * Navbar 本体：高さは常に py-4 で一定、
 * 内部要素にはアニメーションを一切かけずに
 * コンテナ側の動きのみでポジションを制御します。
 */
export default function Header() {
  return (
    <header className="flex items-center justify-between py-4">
      {/* 左側：ロゴ＋タイトル */}
      <Link href="/" aria-label={siteMetadata.headerTitle} className="flex items-center">
        <Logo className="w-8 h-8" />
        {typeof siteMetadata.headerTitle === 'string' && (
          <span className="ml-3 text-2xl font-semibold">
            {siteMetadata.headerTitle}
          </span>
        )}
      </Link>

      {/* 右側：リンク＆ボタン群 */}
      <nav className="flex items-center space-x-4">
        {headerNavLinks
          .filter((link) => link.href !== '/')
          .map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="text-base font-medium text-gray-900 dark:text-gray-100 hover:text-primary-500 dark:hover:text-primary-400"
            >
              {link.title}
            </Link>
          ))}
        <SearchButton />
        <ThemeSwitch />
        <MobileNav />
      </nav>
    </header>
)
}