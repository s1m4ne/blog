import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'

const MAX_DISPLAY = 12

const getReadingTime = (text, locale = 'ja') => {
  if (!text) return 1;
  
  const content = text.replace(/<\/?[^>]+(>|$)/g, '');
  
  if (locale === 'en') {
    const wordCount = content.split(/\s+/).length;
    const wordsPerMinute = 225;
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  } 
  else {
    const charCount = content.replace(/\s+/g, '').length;
    const charsPerMinute = 500;
    return Math.max(1, Math.ceil(charCount / charsPerMinute));
  }
};

export default function Home({ posts }) {
  return (
    <>
      <div>
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
              Latest
            </h1>
            <Link
              href="/blog"
              className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
            >
              View all posts →
            </Link>
          </div>
          <p className="text-sm leading-5 text-gray-600 dark:text-gray-400">
            {siteMetadata.description}
          </p>
        </div>
        
        <div className="space-y-4">
          {!posts.length && <p className="text-gray-500 dark:text-gray-400">No posts found.</p>}
          
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary, tags, body, content, readingTime: postReadingTime } = post
            
            let readingTime;
            if (postReadingTime) {
              readingTime = typeof postReadingTime === 'number' 
                ? postReadingTime 
                : postReadingTime.minutes 
                  ? Math.ceil(postReadingTime.minutes) 
                  : 1;
            } else if (body) {
              readingTime = getReadingTime(body, siteMetadata.locale);
            } else if (content) {
              readingTime = getReadingTime(content, siteMetadata.locale);
            } else {
              readingTime = getReadingTime(summary, siteMetadata.locale);
            }
            
            return (
              <article key={slug} className="group">
                <Link href={`/blog/${slug}`} aria-label={`Read "${title}"`}>
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
                        
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <svg className="mr-1 h-3 w-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                          </svg>
                          {readingTime} min read
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {tags.map((tag) => (
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
          })}
        </div>
        
        {posts.length > MAX_DISPLAY && (
          <div className="flex justify-end text-base leading-6 font-medium pt-4">
            <Link
              href="/blog"
              className="text-primary-500 hover:text-primary-800 dark:hover:text-primary-400"
              aria-label="すべての記事"
            >
              すべての記事 &rarr;
            </Link>
          </div>
        )}
      </div>
    </>
  )
}