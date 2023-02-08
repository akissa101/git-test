import { useQuery, useMutation, useQueryClient } from "react-query";
import useAxiosPrivate from "./useAxiosPrivate";

export const useGetUsers = (onSuccess, onError) => {
  const axiosPrivate = useAxiosPrivate();
  const fetchUsers = async () => {
    return await axiosPrivate.get("/users");
  };
  return useQuery("users", fetchUsers, {
    // select: data => {
    //   const superHeroNames = data.data.map(hero => hero.name)
    //   return superHeroNames
    // }
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();

  const deleteUser = async (id) => {
    console.log(id);
    const result = await axiosPrivate.delete(`/users/del/${id}`);
    console.log(result);
  };

  return useMutation(
    deleteUser,

    {
      onSuccess: async () => {
        await queryClient.invalidateQueries("users");
      },
      onMutate: async (deletedUser, edUser) => {
        await queryClient.cancelQueries("users");
        const previousHeroData = queryClient.getQueryData("users");
        queryClient.setQueryData("users", (oldQueryData) => {
          return {
            ...oldQueryData,
            data: [...oldQueryData.data, { ...deletedUser }],
          };
        });
        return { previousHeroData };
      },
    }
  );
};
