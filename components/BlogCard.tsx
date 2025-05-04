import Link from '@/components/Link'
import { formatDate } from 'pliny/utils/formatDate'
import siteMetadata from '@/data/siteMetadata'

export default function BlogCard({ post }) {
  const { path, date, title, summary, tags } = post
  
  return (
    <article className="group">
      <Link href={`/${path}`} aria-label={`Read "${title}"`}>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 transition-all hover:border-gray-300 dark:hover:border-gray-700">
          <div className="flex justify-between">
            <div className="space-y-2 w-full">
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {formatDate(date, siteMetadata.locale)}
              </div>
              
              <h2 className="text-lg font-semibold leading-6 text-gray-900 dark:text-gray-100 group-hover:text-primary-500 dark:group-hover:text-primary-400">
                {title}
              </h2>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                {summary}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {tags && tags.map((tag) => (
                  <div 
                    key={tag} 
                    className="rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-2 py-0.5 text-xs text-gray-600 dark:text-gray-300"
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="ml-3 flex items-center self-center text-gray-400 group-hover:text-primary-500 dark:group-hover:text-primary-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}