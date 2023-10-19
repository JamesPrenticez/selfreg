import React from 'react'
import { mockTasks } from '@mocks'
import { Button } from '@components/common'
import Body from '@components/layout/Body'
import EmojiSelector from '@components/emoji/EmojiSelector'
import EmojiWrapper from '@components/emoji/EmojiWrapper'


const Settings = () => {
  return (
    <Body>
      <h1 className='font-bold text-2xl'>Settings</h1>

      <div className='grid grid-cols-1 gap-4 text-[24px] bg-red-500 p-4'>
      {
        mockTasks.map((task) => {
          return (
            <div key={task._id} className='grid grid-cols-5 gap-4' >
              <p className="bg-white">{task.task_name}</p>
              <p className="bg-white">{task.color}</p>
              <p className="bg-white">{task.bgcolor}</p>
              <p className="bg-white">
                <EmojiWrapper unified={task.successIcon}/>
              </p>
              <p className="bg-white">
                <EmojiWrapper unified={task.errorIcon}/>
              </p>
            </div>
              )
            })
          }
      </div>

      <EmojiSelector />

      <Button>
        Add Task
      </Button>
      <div></div>
    </Body>
  )
}

export default Settings