import React, { useState, useEffect } from "react"
import { Button } from "./components/ui/button"
import api from "./api/axios"

const App: React.FC = () => {
  const [data, setData] = useState<string[]>([]) // 存储从后端获取的数组
  const [currentIndex, setCurrentIndex] = useState<number>(0) // 存储当前展示的数组项索引
  const [isLoading, setIsLoading] = useState<boolean>(false) // 存储是否正在加载数据

  useEffect(() => {
    // 模拟从后端获取的数组，实际上应该是通过网络请求获取
    const fetchData = () => {
      api
        .get("/data", { params: { a: 2 } })
        .then(() => {})
        .catch(() => {})
      // 假设这是从后端获取的数组
      const backendData: string[] = [
        "Item 1",
        "Item 2",
        "Item 3",
        "Item 4",
        "Item 5",
      ]
      setData(backendData)
    }
    console.log(isLoading)

    if (isLoading) {
      setCurrentIndex(0)

      fetchData() // 获取数组
    }
    console.log(data)
  }, [isLoading]) // 当 isLoading 改变时运行副作用

  useEffect(() => {
    console.log("interval")
    // 定时器，每秒钟更新展示的数组项索引
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1
        if (nextIndex === data.length) {
          clearInterval(interval) // 到达最后一个项时停止定时器
          return prevIndex
        }
        return nextIndex % data.length // 确保索引循环
      })
    }, 1000)

    // 当组件卸载时清除定时器
    return () => clearInterval(interval)
  }, [data]) // 当data改变时运行副作用

  const handleClick = () => {
    setIsLoading(!isLoading)
  }

  return (
    <div>
      <h1>展示数据:</h1>
      <p>{data.length > 0 && data[currentIndex]}</p>
      <Button onClick={handleClick} disabled={isLoading}>
        {isLoading ? "加载中..." : "获取数据"}
      </Button>
    </div>
  )
}

export default App
