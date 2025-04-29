// app/(main)/blog/[id]/DetailBlogClient.tsx
"use client";

import { useEffect, useState } from "react";
import { useGetAllBlogs, useGetSingleBlog } from "@/hooks/blog.hook";
import { convertSlugToName } from "@/utils/helper";
import Breadcrumbs from "@/components/breadcrumbs";
import Articles from "@/components/articles";
import Loader from "@/components/Loader";
import Image from "next/image";

interface DetailBlogClientProps {
  slug: string;
}

export default function DetailBlogClient({ slug }: DetailBlogClientProps) {
  const [blogId, setBlogId] = useState<string | null>(null);

  // Get all blogs to find matching ID
  const { data: allBlogsResponse } = useGetAllBlogs();
  const allBlogs = allBlogsResponse?.data;

  // Find the matching blog ID based on slug
  useEffect(() => {
    if (allBlogs && allBlogs.length > 0) {
      const matchingBlog = allBlogs.find(
        (item: { title: string }) =>
          item.title.toLowerCase().replace(/\s+/g, "-") === slug ||
          convertSlugToName(slug) === item.title.toLowerCase()
      );

      if (matchingBlog) {
        setBlogId(matchingBlog.blogId);
      
      } else {

      }
    }
  }, [allBlogs, slug]);

  // Fetch single blog with the found ID
  const { data: { data: blog } = {}, isLoading } = useGetSingleBlog(
    blogId || ""
  );



  if (isLoading) {
    return (
      <div className="text-center py-10 grid place-items-center mt-40 h-screen">
        <Loader />
      </div>
    );
  }

  if (!blog && !isLoading) {
    return <div className="container pt-36">Blog not found</div>;
  }

  return (
    <div className="container">
      <div className="pb-10 pt-28 lg:pb-20 lg:pt-36">
        <Breadcrumbs previousPath="Our Blog" currentPath={blog?.title || ""} />
        <div className="mx-auto pt-16 lg:w-4/5">
          <h2 className="text-heading-4 lg:text-heading-2 text-center text-secondary-100">
            {blog?.title}
          </h2>
          <div className="mt-4 flex items-center justify-center space-x-3">
            <Image
              className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
              src={blog?.author?.profilePhoto || "/default-avatar.png"}
              alt="author avatar"
              width={48}
              height={48}
            />
            <div className="space-y-1.5 text-start">
              <span className="text-body-3-bold block text-secondary-100">
                By {blog?.author?.name}
              </span>
              <span className="text-body-3-bold block text-secondary-50">
                {blog?.publishDate
                  ? new Date(blog.publishDate).toLocaleDateString()
                  : ""}
              </span>
            </div>
          </div>
          <div className="mx-auto lg:w-[75%]">
            <div
              className="mt-4 h-[240px] rounded-2xl bg-cover bg-center lg:h-[430px]"
              style={{
                backgroundImage: `url(${blog?.image})`,
              }}
            />
            <div className="mt-8">
              <p className="text-body-2-regular text-secondary-50 whitespace-pre-line">
                {blog?.content}
              </p>
            </div>
          </div>
        </div>
        <div className="pb-10 pt-20 lg:pt-40">
          <h3 className="text-caption-2 lg:text-caption-1 text-center text-primary-100">
            Our Blog
          </h3>
          <h2 className="text-heading-4 lg:text-heading-2 mt-2 text-center">
            Related Articles
          </h2>
          {/* Format blog data for Articles component */}
          {blog && (
            <Articles
              data={[
                {
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
                },
              ]}
            />
          )}
        </div>
      </div>
    </div>
  );
}
