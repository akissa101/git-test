"use client";

import Link from "next/link";
import { Article } from "../../typings";
import { useGetArticles } from "../hooks/useArticleData";
import Articles from "./page";

function ArticlesList() {
  const { data, isLoading, isError, error } = useGetArticles();
  const articles: Article[] = data?.data;

  if (isLoading) return <p>Looding...</p>;
  // if (isError) return <p>{error.message}</p>;

  return (
    <article>
      {articles?.map((article) => (
        <div key={article._id}>
          <Link href={`/articles/${article._id}`}>
            <p>{article.title}</p>
          </Link>
        </div>
      ))}
    </article>
  );
}

export default ArticlesList;
