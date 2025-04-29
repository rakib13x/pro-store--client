"use client";
import { getAllBlogs, getSingleBlog } from "@/services/blog";
import { useQuery } from "@tanstack/react-query";



export const useGetAllBlogs = () => {
    return useQuery({
        queryKey: ["get-all-blogdata"],
        queryFn: getAllBlogs,
    });
};

export const useGetSingleBlog = (id: string) => {
    return useQuery({
        enabled: !!id,
        queryKey: ["single-blog", id],
        queryFn: () => getSingleBlog(id),
    });
};
