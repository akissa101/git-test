"use client";

import React from "react";
import { Article } from "../../../typings";
import { notFound } from "next/navigation";
import { useGetArticle } from "../../hooks/useArticleData";

type PageProps = {
  params: {
    articleId: string;
    error: string;
  };
};

function ArticlePage({ params: { articleId } }: PageProps) {
  // console.log(articleId)

  //Get current article
  const { data, isLoading, isError, error } = useGetArticle(articleId);
  const article: Article = data?.data;

  // console.log(article);

  if (isLoading) return <p>Looding...</p>;
  // if (isError) return <p>{error}</p>;

  if (!article?._id) return notFound();

  return (
    <div className="p-6 bg-yellow-200 border-2 m-2 shadow-lg">
      <p>
        #{article._id} : {article.title}
      </p>
      <p>Completed: {article.content}</p>
      <p className="border-t border-black mt-5 text-right">
        My User: {article.userid}
      </p>
    </div>
  );
}

export default ArticlePage;

// export async function generateStaticParams() {
//   const res = await fetch(`http://localhost:5000/getarticles`, {
//     next: { revalidate: 60 },
//   });
//   const articles: Article[] = await res.json();

//   const trimedArticles = articles.slice(0, 3);

//   return trimedArticles.map((article) => ({
//     articleId: article._id.toString(),
//   }));
// }
