// components/ScrollAnimatedHeader.tsx
'use client'

import { useEffect, useState, useRef } from 'react'
import Header from './Header'

/**
 * スクロールに応じてヘッダーを
 * 1. full-width 固定
 * 2. 小幅・中央寄せ＋角丸長方形＋枠線・背景
 * 3. 非表示（スライド＆フェードアウト）
 *
 * コンテナの width/top のみを transition-all でアニメーションします。
 */
export default function ScrollAnimatedHeader() {
  const [notTop, setNotTop] = useState(false)
  const [hidden, setHidden] = useState(false)
  const prevY = useRef(0)

  const sentinel1 = useRef<HTMLDivElement>(null)
  const sentinel2 = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const s1 = sentinel1.current!
    const s2 = sentinel2.current!

    // 閾値1：20px を超えたら condensed モード
    const obs1 = new IntersectionObserver(([entry]) => setNotTop(!entry.isIntersecting), {
      root: null,
      threshold: 0,
    })
    // 閾値2：350px を超え、かつ下方向スクロール時に非表示
    const obs2 = new IntersectionObserver(
      ([entry]) => {
        const y = entry.boundingClientRect.y
        const down = y < prevY.current
        if (!entry.isIntersecting && down) setHidden(true)
        else if (entry.isIntersecting) setHidden(false)
        prevY.current = y
      },
      { root: null, threshold: 0 }
    )

    obs1.observe(s1)
    obs2.observe(s2)
    return () => {
      obs1.disconnect()
      obs2.disconnect()
    }
  }, [])

  // コンテナ：幅／位置の変化のみを animate
  let cls = 'sticky top-3 z-50 mx-auto transition-all duration-300 ease-in-out'

  if (!notTop) {
    // 1. full-width
    cls += ' w-full bg-transparent border-none shadow-none px-0'
  } else {
    // 2. condensed
    cls +=
      ' w-[70%] rounded-full border-2 border-gray-300 dark:border-gray-700 shadow-md bg-white dark:bg-gray-950 px-6'
  }
  if (hidden) {
    // 3. hidden
    cls += ' -translate-y-10 opacity-0'
  }

  return (
    <>
      <div
        ref={sentinel1}
        style={{ position: 'absolute', top: 20, left: 0, width: 1, height: 1 }}
      />
      <div
        ref={sentinel2}
        style={{ position: 'absolute', top: 500, left: 0, width: 1, height: 1 }}
      />
      <div className={cls}>
        <Header />
      </div>
    </>
  )
}
