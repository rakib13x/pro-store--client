import Image from "next/image";
import { convertSlugToName } from "@/utils/helper";
import { FaTelegramPlane } from "react-icons/fa";
import {
  RiDiscordFill,
  RiLinkedinBoxFill,
  RiTwitterFill,
} from "react-icons/ri";
import Breadcrumbs from "@/components/breadcrumbs";
import Articles from "@/components/articles";
import ArticlesData from "../../../../public/json/articles.json";

export default function DetailBlog({ params }: { params: { slug: string } }) {
  const data = ArticlesData.find(
    (item) => item.title.toLowerCase() == convertSlugToName(params.slug)
  );

  return (
    <div className="container">
      <div className="pb-10 pt-28 lg:pb-20 lg:pt-36">
        <Breadcrumbs previousPath="Menu" currentPath={data?.title || ""} />
        <div className="mx-auto pt-16 lg:w-4/5">
          <h2 className="text-heading-4 lg:text-heading-2 text-center text-secondary-100">
            {data?.title}
          </h2>
          <div className="mt-4 flex items-center justify-center space-x-3">
            <Image
              className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
              src={require(`../../../../public/assets/img/avatar-1.png`)}
              alt="avatar"
            />
            <div className="space-y-1.5 text-start">
              <span className="text-body-3-bold block text-secondary-100">
                By {data?.author?.name}
              </span>
              <span className="text-body-3-bold block text-secondary-50">
                {data?.publishDate}
              </span>
            </div>
          </div>
          <div className="mx-auto lg:w-[75%]">
            <div
              className="mt-4 h-[240px] rounded-2xl bg-cover bg-center lg:h-[430px]"
              style={{
                backgroundImage: `url(/assets/img/${data?.image})`,
              }}
            />
            <div
              className="mt-8"
              dangerouslySetInnerHTML={{ __html: data?.content || "" }}
            ></div>
          </div>
          <div className="mt-8 flex flex-col items-center space-y-3">
            <span className="text-heading-6 text-secondary-100">Share</span>
            <div className="flex space-x-5">
              <button className="group flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 transition duration-200 hover:bg-additional-yellow">
                <RiDiscordFill className="h-5 w-5 text-white transition duration-200 group-hover:text-secondary-100" />
              </button>
              <button className="group flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 transition duration-200 hover:bg-additional-yellow">
                <RiTwitterFill className="h-5 w-5 text-white transition duration-200 group-hover:text-secondary-100" />
              </button>
              <button className="group flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 transition duration-200 hover:bg-additional-yellow">
                <FaTelegramPlane className="h-5 w-5 text-white transition duration-200 group-hover:text-secondary-100" />
              </button>
              <button className="group flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 transition duration-200 hover:bg-additional-yellow">
                <RiLinkedinBoxFill className="h-5 w-5 text-white transition duration-200 group-hover:text-secondary-100" />
              </button>
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
          <Articles data={ArticlesData.slice(0, 3)} />
        </div>
      </div>
    </div>
  );
}
