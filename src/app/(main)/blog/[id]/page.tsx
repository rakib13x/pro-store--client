import React from "react";
import DetailBlog from "./BlogDetails";

const DetailBlogPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return <div>{id && <DetailBlog params={{ id: id }} />}</div>;
};

export default DetailBlogPage;
