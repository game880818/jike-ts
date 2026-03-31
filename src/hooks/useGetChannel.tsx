import { useState, useEffect } from "react";
import { getChannelAPI } from "@/apis/publish";


// 種類の型を定義する
interface ChannelItem {
  id: number,
  name: string
}

function useGetChannel() {
  const [channel, setChannel] = useState<ChannelItem[]>([])
  useEffect(() => {
    async function getChannel() {
      const res = await getChannelAPI()
      setChannel(res.data.channels)
    }
    getChannel()
  }, [])
  return { channel }
}

export default useGetChannel