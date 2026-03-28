"use client"

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"

export default function ProgressBar({percentage} : {percentage: number}) {
  return (
    <div className='flex justify-center p-10'>
        <CircularProgressbar 
            styles={buildStyles({
                pathColor: percentage >= 100 ? '#DC2626' : '#F59E0B',//pathcolor es color que se llena, en caso de ser >= 100 el color es rojo
                trailColor: '#e1e1e1',
                textColor: percentage >= 100 ? '#DC2626' : '#F59E0B',
                textSize: 8
            })}
            text={`${percentage}% Gastado`}
            value={percentage}
        />
    </div>
  )
}
