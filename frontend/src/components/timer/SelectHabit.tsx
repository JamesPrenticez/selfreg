import React from "react";
import { Autocomplete } from "@components/ui";
import { ILabelAndValue } from "@models";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { useGetHabitsQuery } from "@redux/services";
import { setActiveHabit } from "@redux/slices";

function SelectHabit() {
  const { data: habitsData, activeHabit } = useAppSelector((state) => state.habits);
  const dispatch = useAppDispatch();

  const habitsOptions: ILabelAndValue[] = Object.values(habitsData).map((habit) => ({
    label: habit.title,
    value: habit._id,
  }));

  return (
    <div className="absolute w-full text-primary">
      <Autocomplete
        options={habitsOptions}
        value={activeHabit?.label ?? "No option selected"}
        onChange={(newValue: ILabelAndValue) => {
          dispatch(setActiveHabit(newValue));
        }}
      />
    </div>
  );
}

export default SelectHabit;
