// layouts/TagsSidebar.tsx
'use client'

import { usePathname } from 'next/navigation'
import { slug } from 'github-slugger'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import tagData from 'app/tag-data.json'

export default function TagsSidebar() {
  const pathname = usePathname()
  // 修正：新しい tag-data.json 構造に対応
  const tagInfo = tagData as { 
    tagCount: Record<string, number>,
    originalTagMapping: Record<string, string>
  }
  const tagCounts = tagInfo.tagCount
  const originalTags = tagInfo.originalTagMapping
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])

  return (
    <div className="hidden sm:mt-0 sm:block sm:w-1/4">
      <div className="w-full pt-11">
        <div className="mb-1 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="mr-2 h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
            />
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
          </svg>
          <h2 className="text-xl font-bold">Tags</h2>
        </div>
        <div className="h-0"></div>

        <div className="mt-2 flex flex-wrap">
          {sortedTags.map((t) => {
            const isCurrentTag = pathname.includes(`/tags/${slug(t)}`)
            return (
              <Tag
                key={t}
                text={t}
                variant="pill"
                size="md"
                className={`m-1 ${
                  isCurrentTag
                    ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200 border-primary-300 dark:border-primary-700 border'
                    : ''
                }`}
              />
            )
          })}
        </div>

        <div className="mt-6 flex justify-end">
          <Link
            href="/tags"
            className="text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 flex items-center text-sm font-medium"
          >
            View all
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="ml-1 h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}