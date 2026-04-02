import BarChart from './Component/BarChart'

const Home = () => {
  return (
    <div>
      <BarChart
        title="どんな動物が好きですか？"
        xdata={['ネズミ', '犬', '猫']}
        sdata={[70, 110, 200]}
      />
      <BarChart
        title="フレームワークの使用率"
        xdata={['React', 'Vue', 'Angular']}
        sdata={[80, 60, 40]}
        style={{ width: '600px', height: '450px' }}
      />
    </div >
  )
}

export default Home