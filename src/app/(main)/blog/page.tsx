import Articles from "@/components/articles";
import PageTitle from "@/components/page-title";
import ArticlesData from "../../../../public/json/articles.json";

export default function Blog() {
  return (
    <>
      <PageTitle path="Blog" title="Our Blog" />

      <div className="container">
        <div className="pb-10 pt-20 lg:pb-20 lg:pt-40">
          <h2 className="text-heading-4 lg:text-heading-2 text-secondary-100">
            Latest Post
          </h2>
          <Articles data={ArticlesData.slice(0, 6)} />
        </div>
        <div className="pb-20 pt-10 lg:pb-40 lg:pt-20">
          <h2 className="text-heading-4 lg:text-heading-2 text-secondary-100">
            Most Popular Post
          </h2>
          <Articles data={ArticlesData.slice(0, 6)} />
        </div>
      </div>
    </>
  );
}
