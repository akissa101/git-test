import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "../api/axios";
import useAxiosPrivate from "./useAxiosPrivate";

export const useRegister = () => {
  // const axiosPrivate = useAxiosPrivate();
  const addUser = async (user) => {
    const result = await axios.post("/register", user);
  };
  const queryClient = useQueryClient();

  return useMutation(addUser, {
    /**Optimistic Update Start */
    onMutate: async (newUser) => {
      await queryClient.cancelQueries("users");
      const previousHeroData = queryClient.getQueryData("users");
      queryClient.setQueryData("users", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [...oldQueryData.data, { ...newUser }],
        };
      });
      return { previousHeroData };
    },
    onError: (_err, _newTodo, context) => {
      queryClient.setQueryData("users", context.previousHeroData);
    },
    onSettled: () => {
      queryClient.invalidateQueries("users");
    },
    /**Optimistic Update End */
  });
};
