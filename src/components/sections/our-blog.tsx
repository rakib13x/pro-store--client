/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useGetAllBlogs } from "@/hooks/blog.hook";
import Articles from "../articles";

export default function OurBlog() {
  const { data: blogData } = useGetAllBlogs();

  // Map the data to match the required structure for the Articles component
  const articles = blogData?.data?.slice(0, 3).map((blog: any) => ({
    image: blog.image,
    title: blog.title,
    author: blog.author
      ? {
          name: blog.author.name,
          image: blog.author.profilePhoto,
        }
      : null,
    publishDate: blog.publishDate,
    content: blog.content,
  }));

  return (
    <section id="our-blog">
      <div className="pb-20 pt-10 lg:pb-36 lg:pt-20">
        <h3 className="text-caption-2 lg:text-caption-1 text-center text-primary-100">
          Our Blog
        </h3>
        <h2 className="text-heading-4 lg:text-heading-2 mt-2 text-center">
          Latest Post
        </h2>
        <Articles data={articles || []} />{" "}
        {/* Passing the mapped articles data */}
      </div>
    </section>
  );
}
