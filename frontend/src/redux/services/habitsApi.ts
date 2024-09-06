import { baseApi } from '@redux/services/baseApi'
import { ISuccessResult, IHabit } from '@models'

export const habitsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getHabits: builder.query<ISuccessResult<IHabit[]>, void>({ // Notice the `IHabit[]` inside ISuccessResult
      query: () => ({
        url: `habits`,
        method: 'GET',
        queryKey: 'Habits',
      }),
    }),
  }),
});

export const { 
  useGetHabitsQuery
} = habitsApi;
