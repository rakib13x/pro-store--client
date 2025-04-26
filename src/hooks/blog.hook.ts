"use client";
import { queryClient } from "@/providers/Provider";
import { getAllBlogs, getSingleBlog } from "@/services/blog";
import { useQuery } from "@tanstack/react-query";

// Invalidate the "get-all-blogdata" query
const invalidateAllBlogData = () =>
    queryClient.invalidateQueries({ queryKey: ["get-all-blogdata"] });

// Hook for fetching all blogs
export const useGetAllBlogs = () => {
    return useQuery({
        queryKey: ["get-all-blogdata"],
        queryFn: getAllBlogs,
    });
};

// Hook for fetching a single blog by its ID
export const useGetSingleBlog = (id: string) => {
    return useQuery({
        enabled: !!id, // Ensure query runs only if id is provided
        queryKey: ["single-blog", id],
        queryFn: () => getSingleBlog(id),
    });
};
