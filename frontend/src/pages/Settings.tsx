import React from 'react'
import { mockTodos } from '@mocks'
import { Button } from '@components/common'
import Body from '@components/layout/Body'
import EmojiSelector from '@components/emoji/EmojiSelector'
import EmojiWrapper from '@components/emoji/EmojiWrapper'
import User from '@components/user/UserSettings'


const Settings = () => {
  return (
    <Body>
      <h1 className='font-bold text-2xl'>Settings</h1>
      <User />
      <div className='grid grid-cols-1 gap-4 text-[24px] bg-red-500 p-4'>
      {
        mockTodos.map((todo) => {
          return (
            <div key={todo._id} className='grid grid-cols-5 gap-4' >
              <p className="bg-white">{todo.title}</p>
              <p className="bg-white">{todo.color}</p>
              <p className="bg-white">{todo.bgcolor}</p>
              <p className="bg-white">
                <EmojiWrapper unified={todo.successIcon ?? ""} size={50}/>
              </p>
              <p className="bg-white">
                <EmojiWrapper unified={todo.errorIcon ?? ""} size={50}/>
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