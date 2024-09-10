import { IDay, IDays, IHabit, Unit } from "@models";
import { getWeekData, getWeekDateArray } from "@utils";



const {week_number: currentWeekNumber} = getWeekData()

// const lastWeek = getWeekDateArray(currentWeekNumber);
const thisWeek = getWeekDateArray(currentWeekNumber);
const nextWeek = getWeekDateArray(currentWeekNumber);


// export const mockDays: IDays = new Map([
//   [`${thisWeek[0]}`, {_id: "f391e3a9cdf72083a718ae95", todo_id: "5f50c31e1c4ae0b63c4b4a94", date: thisWeek[0], measurement: {quantity: 1, unit: Unit.TIME}}],
//   [`${thisWeek[1]}`, {_id: "797f4ce34401fbc485610f48", todo_id: "5f50c31e1c4ae0b63c4b4a94", date: thisWeek[0], measurement: {quantity: 15654, unit: Unit.TIME}}],
//   [`${thisWeek[2]}`, {_id: "e8f1d2127596ab17d08b6eae", todo_id: "5f50c31e1c4ae0b63c4b4a94", date: thisWeek[0], measurement: {quantity: 0, unit: Unit.TIME}}],
//   [`${thisWeek[3]}`, {_id: "953cb8033975f8189773b0c3", todo_id: "5f50c31e1c4ae0b63c4b4a94", date: thisWeek[0], measurement: {quantity: 8885, unit: Unit.TIME}}],
//   [`${thisWeek[4]}`, {_id: "fa02e1379f414312024f88c8", todo_id: "5f50c31e1c4ae0b63c4b4a94", date: thisWeek[0], measurement: {quantity: 360, unit: Unit.TIME}}],
//   [`${thisWeek[5]}`, {_id: "ca6c5e0cad52ac0313fbbebe", todo_id: "5f50c31e1c4ae0b63c4b4a94", date: thisWeek[0], measurement: {quantity: 54, unit: Unit.TIME}}],
//   [`${thisWeek[6]}`, {_id: "585968bd50d8a24274e8c5ee", todo_id: "5f50c31e1c4ae0b63c4b4a94", date: thisWeek[0], measurement: {quantity: 447, unit: Unit.TIME}}],
//   [`${nextWeek[0]}`, {_id: "b19c866f7f14ac8e60dafc33", todo_id: "5f50c31e1c4ae0b63c4b4a94", date: thisWeek[0], measurement: {quantity: 123, unit: Unit.TIME}}],
// ]);

export const mockDaysRecord: IHabit["days"] = {
  [`${thisWeek[0]}`]: {_id: "f391e3a9cdf72083a718ae95", habit_id: "29f8424c32b86011633c0a6e", date: thisWeek[0], measurement: {quantity: 1, unit: Unit.TIME}},
  [`${thisWeek[1]}`]: {_id: "797f4ce34401fbc485610f48", habit_id: "29f8424c32b86011633c0a6e", date: thisWeek[0], measurement: {quantity: 15654, unit: Unit.TIME}},
  [`${thisWeek[2]}`]: {_id: "e8f1d2127596ab17d08b6eae", habit_id: "29f8424c32b86011633c0a6e", date: thisWeek[0], measurement: {quantity: 0, unit: Unit.TIME}},
  [`${thisWeek[3]}`]: {_id: "953cb8033975f8189773b0c3", habit_id: "29f8424c32b86011633c0a6e", date: thisWeek[0], measurement: {quantity: 8885, unit: Unit.TIME}},
  [`${thisWeek[4]}`]: {_id: "fa02e1379f414312024f88c8", habit_id: "29f8424c32b86011633c0a6e", date: thisWeek[0], measurement: {quantity: 360, unit: Unit.TIME}},
  [`${thisWeek[5]}`]: {_id: "ca6c5e0cad52ac0313fbbebe", habit_id: "29f8424c32b86011633c0a6e", date: thisWeek[0], measurement: {quantity: 54, unit: Unit.TIME}},
  [`${thisWeek[6]}`]: {_id: "585968bd50d8a24274e8c5ee", habit_id: "29f8424c32b86011633c0a6e", date: thisWeek[0], measurement: {quantity: 447, unit: Unit.TIME}},
  [`${nextWeek[0]}`]: {_id: "b19c866f7f14ac8e60dafc33", habit_id: "29f8424c32b86011633c0a6e", date: thisWeek[0], measurement: {quantity: 123, unit: Unit.TIME}},
};

// export const mockDaysArray: IDay[] = [
//   // Meditation
//   { _id: "f391e3a9cdf72083a718ae95", todo_id: "5f50c31e1c4ae0b63c4b4a94", date: thisWeek[0], measurement: { quantity: 1, unit: Unit.TIME} },
//   { _id: "797f4ce34401fbc485610f48", todo_id: "5f50c31e1c4ae0b63c4b4a94", date: thisWeek[1], measurement: { quantity: 1, unit: Unit.TIME} },
//   { _id: "e8f1d2127596ab17d08b6eae", todo_id: "5f50c31e1c4ae0b63c4b4a94", date: thisWeek[2], measurement: { quantity: 1, unit: Unit.TIME} },
//   { _id: "953cb8033975f8189773b0c3", todo_id: "5f50c31e1c4ae0b63c4b4a94", date: thisWeek[3], measurement: { quantity: 1, unit: Unit.TIME} },
//   { _id: "fa02e1379f414312024f88c8", todo_id: "5f50c31e1c4ae0b63c4b4a94", date: thisWeek[4], measurement: { quantity: 1, unit: Unit.TIME} },
//   { _id: "ca6c5e0cad52ac0313fbbebe", todo_id: "5f50c31e1c4ae0b63c4b4a94", date: thisWeek[5], measurement: { quantity: 1, unit: Unit.TIME} },
//   { _id: "585968bd50d8a24274e8c5ee", todo_id: "5f50c31e1c4ae0b63c4b4a94", date: thisWeek[6], measurement: { quantity: 1, unit: Unit.TIME} },
//   { _id: "b19c866f7f14ac8e60dafc33", todo_id: "5f50c31e1c4ae0b63c4b4a94", date: nextWeek[0], measurement: { quantity: 1, unit: Unit.TIME} },

//   // Exercise
//   { _id:"6778d3da63961cc2dbec07f1", todo_id: "d746d674af5d9ca20be219e0", date: thisWeek[0], status: true },
//   { _id:"f36114467b729e02611a937b", todo_id: "d746d674af5d9ca20be219e0", date: thisWeek[1], status: true },
//   { _id:"dd3df1947e891524cafebf33", todo_id: "d746d674af5d9ca20be219e0", date: thisWeek[2], status: true },
//   { _id:"b2820cdf94f06ba45a1f3dd3", todo_id: "d746d674af5d9ca20be219e0", date: thisWeek[3], status: false },
//   { _id:"dae99336b0ff620727f85a9c", todo_id: "d746d674af5d9ca20be219e0", date: thisWeek[4], status: true },
//   { _id:"e5f98ae6b7738ecb33a0c186", todo_id: "d746d674af5d9ca20be219e0", date: thisWeek[5], status: true },
//   { _id:"5dfd7472aa553fe2d1f5fe17", todo_id: "d746d674af5d9ca20be219e0", date: thisWeek[6], status: null },
//   { _id:"ddd4334b7ca4d6d6fd275526", todo_id: "d746d674af5d9ca20be219e0", date: nextWeek[0], status: true },


//   // Meditation
//   { _id:"58aba5d7b3d1f44ca5144e68", todo_id: "29f8424c32b86011633c0a6e", date: thisWeek[0], status: true },
//   { _id:"5321375cfb96ba2a4c7f33f4", todo_id: "29f8424c32b86011633c0a6e", date: thisWeek[1], status: true },
//   { _id:"99bc2a6ee03607a885dcb867", todo_id: "29f8424c32b86011633c0a6e", date: thisWeek[2], status: true },
//   { _id:"1dccde180a1990fff767efb0", todo_id: "29f8424c32b86011633c0a6e", date: thisWeek[3], status: false },
//   { _id:"3dc32a1f2b413376e2792396", todo_id: "29f8424c32b86011633c0a6e", date: thisWeek[4], status: true },
//   { _id:"582c5e38894ce21abcfb8d66", todo_id: "29f8424c32b86011633c0a6e", date: thisWeek[5], status: true },
//   { _id:"e0adebb095ba2bb5f13d7348", todo_id: "29f8424c32b86011633c0a6e", date: thisWeek[6], status: null },
//   { _id:"5ac4699c75f68dbb0a31fbc8", todo_id: "29f8424c32b86011633c0a6e", date: nextWeek[0], status: true },

//   // Business
//   { _id: "72e35d572fe479fcf6010b3f", todo_id: "38f8427c32ba50112633d0f9b", date: thisWeek[0], status: true },
//   { _id: "0294d47c22f9058a694385e9", todo_id: "38f8427c32ba50112633d0f9b", date: thisWeek[1], status: true },
//   { _id: "b53d0e28ec439dc608950039", todo_id: "38f8427c32ba50112633d0f9b", date: thisWeek[2], status: true },
//   { _id: "c52b1d11f8b147d337893a4a", todo_id: "38f8427c32ba50112633d0f9b", date: thisWeek[3], status: false },
//   { _id: "c6dc6aea16d98815a6f982b4", todo_id: "38f8427c32ba50112633d0f9b", date: thisWeek[4], status: true },
//   { _id: "60c695d821855eb4c9aac8fa", todo_id: "38f8427c32ba50112633d0f9b", date: thisWeek[5], status: true },
//   { _id: "abda5a74272588c455377e37", todo_id: "38f8427c32ba50112633d0f9b", date: thisWeek[6], status: null },
//   { _id: "2348885984e2c232cb959661", todo_id: "38f8427c32ba50112633d0f9b", date: nextWeek[0], status: true },


// ]

