import { slug } from 'github-slugger'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayoutWithTags'
import { allBlogs } from 'contentlayer/generated'
import tagData from 'app/tag-data.json'
import { genPageMetadata } from 'app/seo'
import { Metadata } from 'next'

const POSTS_PER_PAGE = 5

export async function generateMetadata(props: {
  params: Promise<{ tag: string; page: string }>
}): Promise<Metadata> {
  const params = await props.params
  const tag = decodeURI(params.tag)
  
  // タグデータから元のタグ名を取得（存在する場合）
  const tagInfo = tagData as {
    tagCount: Record<string, number>
    originalTagMapping: Record<string, string>
  }
  const originalTagMapping = tagInfo.originalTagMapping || {}
  const originalTag = originalTagMapping[tag] || tag
  
  return genPageMetadata({
    title: `${originalTag} posts - Page ${params.page}`,
    description: `${siteMetadata.title} ${originalTag} tagged content - Page ${params.page}`,
    alternates: {
      canonical: './',
    },
  })
}

export const generateStaticParams = async () => {
  // tag-data.json の新しい構造に対応
  const tagInfo = tagData as {
    tagCount: Record<string, number>
    originalTagMapping: Record<string, string>
  }
  const tagCounts = tagInfo.tagCount
  
  return Object.keys(tagCounts).flatMap((tag) => {
    const postCount = tagCounts[tag]
    const totalPages = Math.max(1, Math.ceil(postCount / POSTS_PER_PAGE))
    return Array.from({ length: totalPages }, (_, i) => {
      return {
        tag,
        page: (i + 1).toString(),
      }
    })
  })
}

export default async function TagPagination(props: { params: Promise<{ tag: string; page: string }> }) {
  const params = await props.params
  const tag = decodeURI(params.tag)
  const page = parseInt(params.page as string)
  
  // タグデータから元のタグ名を取得（存在する場合）
  const tagInfo = tagData as {
    tagCount: Record<string, number>
    originalTagMapping: Record<string, string>
  }
  const originalTagMapping = tagInfo.originalTagMapping || {}
  const originalTag = originalTagMapping[tag] || tag
  
  // タイトルに元のタグ名を使用
  const title = originalTag
  
  const filteredPosts = allCoreContent(
    sortPosts(allBlogs.filter((post) => post.tags && post.tags.map((t) => slug(t)).includes(tag)))
  )
  const pageNumber = parseInt(params.page as string)
  const startIndex = (pageNumber - 1) * POSTS_PER_PAGE
  const endIndex = startIndex + POSTS_PER_PAGE
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  const initialDisplayPosts = filteredPosts.slice(startIndex, endIndex)
  const pagination = {
    currentPage: pageNumber,
    totalPages: totalPages,
  }

  return (
    <ListLayout
      posts={filteredPosts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title={title}
    />
  )
}