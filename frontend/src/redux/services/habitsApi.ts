import { baseApi } from '@redux/services/baseApi'
import { ISuccessResult, IHabit, IDay, IDays } from '@models'

export const habitsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getHabits: builder.query<Record<string, IHabit>, void>({
      query: () => ({
        url: `habits`,
        method: 'GET',
        queryKey: 'Habits',
      }),
      transformResponse: (response: ISuccessResult<IHabit[]>) => {
        // Transform the array to a Record<string, IHabit>
        const habitsArray = response.data; // Assuming `data` contains the array
        return habitsArray.reduce((acc: Record<string, IHabit>, habit: IHabit) => {
          acc[habit._id] = habit; // Assuming `id` is a unique identifier for each habit
          return acc;
        }, {});
      },
    }),
    getDays: builder.query<ISuccessResult<IHabit["days"]>, { start_date: string; end_date: string; habit_id: string }>({
      query: ({ start_date, end_date, habit_id }) => ({
        url: `days`,
        method: 'GET',
        params: {
          start_date,
          end_date,
          habit_id
        }
      }),
    }),
  }),
});

export const { 
  useGetHabitsQuery,
  useGetDaysQuery
} = habitsApi;
