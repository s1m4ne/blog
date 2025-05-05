'use client'

import Link from 'next/link'
import { slug } from 'github-slugger'
import tagData from 'app/tag-data.json'

// タグのスタイルバリエーション
export type TagVariant = 'default' | 'pill' | 'bubble' | 'count'

interface Props {
  text: string
  variant?: TagVariant
  size?: 'sm' | 'md' | 'lg'
  showCount?: boolean
  className?: string
  isLink?: boolean // 追加：リンクとして機能するかどうか
}

const Tag = ({
  text,
  variant = 'default',
  size = 'md',
  showCount = false,
  className = '',
  isLink = true, // デフォルトはリンク
}: Props) => {
  // タグデータから元のタグ文字列とカウント数を取得
  const tagInfo = tagData as {
    tagCount: Record<string, number>
    originalTagMapping: Record<string, string>
  }
  const tagCounts = tagInfo.tagCount || {}
  const originalTagMapping = tagInfo.originalTagMapping || {}

  // 表示用のタグ名
  const displayTag = originalTagMapping[slug(text)] || text
  const count = tagCounts[slug(text)] || 0

  // サイズによるクラス - サイズを元のタグに合わせて調整
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-3 py-0.5', // サイドバーのタグに合わせる
    lg: 'text-sm px-3 py-1',
  }

  // バリアントによるクラス
  const variantClasses = {
    default:
      'text-primary-500 hover:text-primary-800 dark:hover:text-primary-400 font-mono font-medium',
    pill: 'rounded-full border border-gray-200 bg-gray-100 text-gray-600 hover:bg-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700',
    bubble:
      'rounded-lg bg-primary-50 text-primary-600 hover:bg-primary-100 dark:bg-primary-900 dark:text-primary-300 dark:hover:bg-primary-800',
    count:
      'rounded-full border border-gray-200 bg-gray-100 hover:bg-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 relative',
  }

  // イベント伝搬を止める関数
  const handleClick = (e) => {
    e.stopPropagation()
  }

  // リンクではなくスパンとして返す
  if (!isLink) {
    return (
      <span className={`inline-block ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}>
        {displayTag}
        {showCount && variant === 'count' && (
          <span className="absolute -top-2 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gray-300 text-xs font-semibold text-gray-700 dark:bg-gray-600 dark:text-gray-300">
            {count}
          </span>
        )}
      </span>
    )
  }

  return (
    <Link
      href={`/tags/${slug(text)}`}
      className={`inline-block ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      aria-label={`View posts tagged ${displayTag}`}
      onClick={handleClick}
    >
      {displayTag}
      {showCount && variant === 'count' && (
        <span className="absolute -top-2 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gray-300 text-xs font-semibold text-gray-700 dark:bg-gray-600 dark:text-gray-300">
          {count}
        </span>
      )}
    </Link>
  )
}

export default Tag
