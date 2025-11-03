'use client'
import { Particles } from "@/components/ui/particles"
import { useRouter } from "next/navigation"
import UserAvatar from './user.png'
import Image from "next/image"
import { Highlighter } from "@/components/ui/highlighter"

export default function Home() {
  const router = useRouter();


  const handleBtnClick = () => {
    router.push("/resume")
  }
  const handleBlogClick = () => {
    router.push("/blog")
  }


  return (
    <div className="bg-background relative flex h-screen w-full flex-col items-center justify-center overflow-hidden rounded-lg border">
      <div className="max-w-3xl px-5">
        <div className="flex  flex-col items-center justify-center gap-5 " >
          <Image className="w-30 h-30 rounded-full" src={UserAvatar} alt="" />
          <div className="flex flex-col items-center justify-center text-center leading-none font-semibold whitespace-pre-wrap">
            <span className="pointer-events-none z-10  mt-10 text-4xl  ">👋 嗨，欢迎来到我的主页</span>
            <span className="pointer-events-none z-10  mt-10 text-xl "  >
              我目前正在寻找新的工作机会，我拥有五年工作经验，您可以在我的 GitHub 主页或者
              <Highlighter action="underline" color="#FF9800">
                我的简历
              </Highlighter>
              找到我的联系方式，欢迎随时联系！🙏
            </span>
          </div>
          <div className="flex gap-5">
            <button className="z-10 mt-5 px-4 py-2 bg-primary cursor-pointer text-primary-foreground rounded-md" onClick={handleBlogClick}>
              近日随笔 ❤️
            </button>
            <button className="z-10 mt-5 px-4 py-2 bg-primary cursor-pointer text-primary-foreground rounded-md" onClick={handleBtnClick}>
              我的简历 📖
            </button>
          </div>


        </div>
      </div>

      <Particles
        className="absolute inset-0 z-0"
        quantity={100}
        ease={80}
        color="#000"
        refresh
      />

    </div>
  );
}
