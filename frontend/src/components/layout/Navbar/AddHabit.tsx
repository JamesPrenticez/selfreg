import React, { Dispatch, useState } from 'react'
import { PlusCircleIcon } from '@components/icons'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from '@components/ui'; 

function AddHabit(){
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <>
      <PlusCircleIcon 
        role="button"
        className='hover:text-primary cursor-pointer'
        width={26} 
        onClick={()=> setIsOpen(prev => !prev)}
      />

      <AddHabitModal
        {...{isOpen, setIsOpen}}
      />
    </>
  )
}

interface AddHabitModal {
  isOpen: boolean;
  setIsOpen: Dispatch<React.SetStateAction<boolean>>;
}

function AddHabitModal({isOpen, setIsOpen}: AddHabitModal) {
  
  return (
    isOpen && (
      <Dialog onClick={() => setIsOpen(false)}>
        {/* <DialogPortal> */}
          {/* <DialogOverlay onClick={() => setIsOpen(false)} /> */}
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Habit</DialogTitle>
              <DialogClose onClick={() => setIsOpen(false)} />
              {/* <CrossIcon role="button" width={26}  onClick={() => setIsOpen(false)}/> */}
            </DialogHeader>
            <DialogDescription>Description goes here.</DialogDescription>
            <DialogFooter>
              <button onClick={() => setIsOpen(false)} className='hover:text-primary'>Close</button>
            </DialogFooter>
          </DialogContent>
        {/* </DialogPortal> */}
        </Dialog>
      )
  )
}

export default AddHabit;