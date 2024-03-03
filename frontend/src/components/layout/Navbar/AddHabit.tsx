import React, {  useState, type Dispatch, type SetStateAction } from 'react'
import { PlusCircleIcon } from '@components/icons'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  Label,
  InputText,
  InputTextArea,
  Button,
} from '@components/ui'; 
import Tabs from '@components/ui/Tabs';
import { useAppDispatch } from '@redux/hooks';
import { type IHabit } from '@models';
import { createNewHabit } from '@redux/slices';

type AddHabitTypes = "yes/no" | "mesurable" | "range"

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
  const options: AddHabitTypes[] = ["yes/no", "mesurable"] // range // subset
  const [ isShowOptions, setIsShowOptions ] = useState<boolean>(true)
  const [ isShowYesNo, setIsShowYesNo ] = useState<boolean>(false)
  const [ isShowMesurable, setIsShowMesurable ] = useState<boolean>(false)

  const [ formData, setFormData ] = useState<Partial<IHabit>>({
    title: "",
    description: "",
    color: ""
  })

  const dispatch = useAppDispatch();

  const handleSetIsOpenOptions = (option: string) => {
    setIsShowOptions(false);
    if(option === "yes/no") {
      setIsShowYesNo(true)
      setIsShowMesurable(false)
    }
    if(option === "mesurable") {
      setIsShowMesurable(true)
      setIsShowYesNo(false)
    }
  }

  const handleCancel = (): void => {
    setIsOpen(false)
    setIsShowOptions(true);
    setIsShowYesNo(false)
    setIsShowMesurable(false)
  }

  const handleSave = (habit: Partial<IHabit>): void => {
    console.log("save")
    console.log(habit)
    dispatch(createNewHabit(habit))

    // setIsShowYesNo(false)
    // setIsShowMesurable(false)
    // setIsShowOptions(false);
  }

  return (
    isOpen && (
      <Dialog onClick={() => setIsOpen(false)}>
          <DialogContent>

            <DialogHeader className='flex-col w-full'>

              <div className='flex w-full'>
                <DialogTitle className='text-3xl'>Create New Habit</DialogTitle>
                <DialogClose className="ml-auto" onClick={handleCancel} />
              </div>

              { !isShowOptions &&
                <div className='flex w-full mt-4'>
                  <Tabs 
                    items={options.map((x) => x)}
                    onClick={(name) =>  handleSetIsOpenOptions(name)}
                    defaultActiveValue={isShowYesNo ? "yes/no" : isShowMesurable ? "mesurable" : ""}
                  />
                </div>
              }
            </DialogHeader>

            <DialogDescription>
              { isShowOptions &&
                  <div className='flex flex-col space-y-2'>
                    {options.map((option, index) => (
                      <AddHabitOption 
                        key={index}
                        type={option} 
                        onClick={() => handleSetIsOpenOptions(option)}
                      />
                    ))}
                  </div>
              }

              { isShowYesNo && (
                <AddYesNoHabit
                  formData={formData}
                  setFormData={setFormData}
                />
              )}

              { isShowMesurable && (
                <AddMesurableHabit 
                  formData={formData}
                  setFormData={setFormData}
                />
              )}
            </DialogDescription>
            
            <DialogFooter>
              <div className='flex justify-end space-x-2'>
                <Button variant='filled' color="error" onClick={handleCancel}>Cancel</Button>
                <Button variant='filled' color="success" onClick={() => handleSave(formData)}>Save</Button>
              </div>
            </DialogFooter>

          </DialogContent>
        </Dialog>
      )
  )
}

interface AddHabitOptionProps{
  type: AddHabitTypes;

  onClick: (x: any) => void
}

function AddHabitOption({type, onClick}: AddHabitOptionProps){
  return (
    <div 
      className='bg-[#444] hover:bg-[#555] border border-transparent hover:border-secondary-muted p-4 rounded-md cursor-pointer'
      onClick={onClick}
    >
      <h1 className='text-xl mb-2'>{type === "yes/no" ? "Yes or No" : type === "mesurable" ? "Mesurable" : type === "range" ? "Range" : null }</h1>
      
      <p className='font-light'>{type === "yes/no" ? "e.g. Did you meditate today? Did you read a book? Did not smoke weed?" 
          : type === "mesurable" ? "e.g. How many hours did you sleep? How many pull ups did you do?" 
          : null 
        }
      </p>

    </div>
  )
}


interface AddYesNoHabitProps{
  formData: Partial<IHabit>
  setFormData: Dispatch<SetStateAction<Partial<IHabit>>>
}

function AddYesNoHabit({formData, setFormData}: AddYesNoHabitProps){

  return (
    <div className='bg-[#444] rounded-md p-4 flex flex-col'>

      <div className='flex gap-4'>
        <Label value="Name" className='w-full'>
          <InputText 
            required
            type="text"
            placeholder='e.g. Exercise'
            value={formData.title}
            onChange={(e) => { setFormData({...formData, title: e.target.value}) }}
          />
        </Label>

        <Label value="color" className='ml-auto'>
          <div className='bg-sky-500  w-[40px] h-[40px] rounded-md ' />
        </Label>
      </div>

      <Label value='Description'>
        <InputTextArea
          placeholder='e.g. Did you exercise today?'
          value={formData.description}
          onChange={(e) => { setFormData({...formData, description: e.target.value}) }}
        />
      </Label>

      {/* <Label value='Frequency'>
        <InputTextArea
          placeholder='e.g. Did you exercise today?'
          value={formData.description}
          onChange={(e) => { setFormData({...formData, description: e.target.value}) }}
        />
      </Label> */}


    </div>
  )
}


interface AddMesurableHabitProps{
  formData: Partial<IHabit>
  setFormData: Dispatch<SetStateAction<Partial<IHabit>>>
}


function AddMesurableHabit({formData, setFormData}: AddMesurableHabitProps){
  return (
    <div className='bg-[#444] rounded-md p-4 flex flex-col'>

      <div className='flex gap-4'>
        <Label value="Name" className='w-full'>
          <InputText 
            type="text"
            placeholder='e.g. Exercise'
            value={formData.title}
            onChange={(e) => { setFormData({...formData, title: e.target.value}) }}
          />
        </Label>

        <Label value="color" className='ml-auto'>
          <div className='bg-red-500  w-[40px] h-[40px] rounded-md ' />
        </Label>
      </div>

      <Label value='Description'>
        <InputTextArea
          placeholder='e.g. Did you exercise today?'
          value={formData.description}
          onChange={(e) => { setFormData({...formData, description: e.target.value}) }}
        />
      </Label>

      {/* <Label value='Frequency'>
        <InputTextArea
          placeholder='e.g. Did you exercise today?'
          value={formData.description}
          onChange={(e) => { setFormData({...formData, description: e.target.value}) }}
        />
      </Label> */}


    </div>
  )
}

export default AddHabit;