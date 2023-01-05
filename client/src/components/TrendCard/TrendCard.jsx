import React from 'react'
import './TrendCard.css'
import {TrendData} from '../../Data/TrendData'

const TrendCard = () => {
  return (
    <div className="TrendCard">
        <h3>Trends for You</h3>
        {TrendData.map((trend,index)=>{
            return(
                <div key={index} className="trend">
                    <span>#{trend.name}</span>
                    <span>{trend.shares}K Shares</span>
                </div>
            )
        })}
    </div>
  )
}

export default TrendCard