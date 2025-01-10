import ArticlesData from "../../../public/json/articles.json";
import Articles from "../articles";

export default function OurBlog() {
  return (
    <section id="our-blog">
      <div className="pb-20 pt-10 lg:pb-36 lg:pt-20">
        <h3 className="text-caption-2 lg:text-caption-1 text-center text-primary-100">
          Our Blog
        </h3>
        <h2 className="text-heading-4 lg:text-heading-2 mt-2 text-center">
          Latest Post
        </h2>
        <Articles data={ArticlesData.slice(0, 3)} />
      </div>
    </section>
  );
}
