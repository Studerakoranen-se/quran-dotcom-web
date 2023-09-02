import React from 'react'
import { useSelector } from 'react-redux'
import RecentCard from './RecentCard'

const RecentSection = () => {
  const histories = useSelector((state: any) => state.history?.recentSurahs)

  return (
    <div className="container text-white py-5 px-5">
      {histories.length > 0 && (
        <React.Fragment>
          <h1 className="text-center text-xl font-inter">Senast visade</h1>
          <div className="flex flex-wrap gap-5 justify-center py-5">
            {histories.map((history: any, i: number) => (
              <RecentCard key={i} data={history} />
            ))}
          </div>
        </React.Fragment>
      )}
    </div>
  )
}

export default RecentSection
