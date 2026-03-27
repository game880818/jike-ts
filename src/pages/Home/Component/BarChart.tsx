import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

interface BarChartProps {
  title: string,
  xdata: string[],
  sdata: number[],
  style?: {
    width: string,
    height: string
  }
}

const BarChart = ({ title, xdata, sdata, style = { width: '480px', height: '360px' } }: BarChartProps) => {
  const chartRef = useRef(null)
  useEffect(() => {
    // 1. 生成实例
    const myChart = echarts.init(chartRef.current)
    // 2. 准备图表参数
    const option = {
      title: {
        text: title
      },
      xAxis: {
        type: 'category',
        data: xdata
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: sdata,
          type: 'bar'
        }
      ]
    }
    // 3. 渲染参数
    myChart.setOption(option)
  }, [])
  return <div ref={chartRef} style={style} />
}

export default BarChart