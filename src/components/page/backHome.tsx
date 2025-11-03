'use client'
import { useRouter } from "next/navigation";

const BackHome = ({ divider = true }: { divider?: boolean }) => {
  const router = useRouter();
  const handleBackClick = () => {
    router.push("/")
  }
  return (
    <div className="my-4" >
      {divider && <hr className="my-4 border-gray-300" />}
      <span className="z-10 mt-5 cursor-pointer  hover:underline underline-offset-4" onClick={handleBackClick}>
        ⬅️ 返回主页
      </span>
    </div>
  )
}

export default BackHome