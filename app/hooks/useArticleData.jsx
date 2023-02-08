import { useQuery, useMutation, useQueryClient } from "react-query";
import useAxiosPrivate from "./useAxiosPrivate";
import axios from "../api/axios";

export const useGetArticles = () => {
  const fetchArticles = async () => {
    const result = await axios.get("/getarticles");
    return result;
  };
  return useQuery("articles", fetchArticles, {
    // select: data => {
    //   const superHeroNames = data.data.map(hero => hero.name)
    //   return superHeroNames
    // }
  });
};

export const useGetArticle = (articleId) => {
  const fetchArticle = async () => {
    console.log(articleId);
    const result = await axios.get(`/getarticle/${articleId}`);
    return result;
  };
  return useQuery("article", fetchArticle);
};

export const useAddArticle = () => {
  const axiosPrivate = useAxiosPrivate();
  const addArticle = async (article) => {
    console.log(article);
    const result = await axiosPrivate.post("/articles", article);
  };
  const queryClient = useQueryClient();

  return useMutation(addArticle, {
    /**Optimistic Update Start */
    onMutate: async (newArticle) => {
      await queryClient.cancelQueries("articles");
      const previousHeroData = queryClient.getQueryData("articles");
      queryClient.setQueryData("articles", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [...oldQueryData.data, { ...newArticle }],
        };
      });
      return { previousHeroData };
    },
    onError: (_err, _newTodo, context) => {
      queryClient.setQueryData("articles", context.previousHeroData);
    },
    onSettled: () => {
      queryClient.invalidateQueries("articles");
    },
    /**Optimistic Update End */
  });
};

export const useUpdateArticle = () => {
  const axiosPrivate = useAxiosPrivate();
  const updateArticle = async (article) => {
    console.log(article);
    const result = await axiosPrivate.put("/articles", article);
  };
  const queryClient = useQueryClient();

  return useMutation(updateArticle, {
    /**Optimistic Update Start */
    onMutate: async (updatedArticle) => {
      await queryClient.cancelQueries("articles");
      const previousHeroData = queryClient.getQueryData("articles");
      queryClient.setQueryData("articles", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [...oldQueryData.data, { ...updatedArticle }],
        };
      });
      return { previousHeroData };
    },
    onError: (_err, _newTodo, context) => {
      queryClient.setQueryData("articles", context.previousHeroData);
    },
    onSettled: () => {
      queryClient.invalidateQueries("articles");
    },
    /**Optimistic Update End */
  });
};

export const useDeleteArticle = () => {
  const axiosPrivate = useAxiosPrivate();
  const deleteArticle = async (id) => {
    console.log(id);
    await axiosPrivate.delete(`/articles/del/${id}`);
  };
  const queryClient = useQueryClient();

  return useMutation(
    deleteArticle,
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries("articles");
      },
    },
    {
      /**Optimistic Update Start */
      onMutate: async (deletedArticle) => {
        await queryClient.cancelQueries("articles");
        const previousHeroData = queryClient.getQueryData("articles");
        queryClient.setQueryData("articles", (oldQueryData) => {
          return {
            ...oldQueryData,
            data: [...oldQueryData.data, { ...deletedArticle }],
          };
        });
        return { previousHeroData };
      },
      onError: (_err, _newTodo, context) => {
        queryClient.setQueryData("articles", context.previousHeroData);
      },
      onSettled: () => {
        queryClient.invalidateQueries("articles");
      },
      /**Optimistic Update End */
    }
  );
};
