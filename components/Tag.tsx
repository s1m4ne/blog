import Link from 'next/link'
import { slug } from 'github-slugger'
interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
    <Link
      href={`/tags/${slug(text)}`}
      className="text-primary-500 hover:text-primary-800 dark:hover:text-primary-400 mr-3 font-mono text-sm font-extrabold font-medium"
    >
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Tag
