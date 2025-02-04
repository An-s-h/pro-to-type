import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { useTheme } from '../Contexts/ThemeContext'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const Graph=({graphData})=>{
  const {theme}=useTheme();
  return(
    <>
    <Line 
    data={
      {
        
        labels: graphData.map(i=>i[0]),
        datasets: [
          {
            label:'wpm',
            data:graphData.map(i=>i[1]),
            borderColor:theme.textColor
          }
        ]
      }
    }
    ></Line>
    </>
  )
}
export default Graph;