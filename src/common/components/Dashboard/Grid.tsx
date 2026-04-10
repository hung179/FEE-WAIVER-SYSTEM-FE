
import React from 'react'
import { StartCard } from './StartCard'
import { AdminActivityLog } from './AdminActivityLog'


export const Grid = () => {
  return (
    <div className='px-4 grid gap-3 grid-cols-12'>
        <StartCard />
        <AdminActivityLog />
    </div>
  )
}
