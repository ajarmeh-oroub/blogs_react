import React from 'react'
import BannerArea from './BannerArea'
import PostGrid from './PostGrid'
import PostLatest from './PostLatest'
import PostTrending from './PostTrending'
export default function Landing() {
  return (
    <>
    <BannerArea />
    <PostTrending/>
    <PostLatest />
    <PostGrid/>
    </>
  )
}
