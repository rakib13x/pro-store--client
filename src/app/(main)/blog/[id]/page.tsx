/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
// import DetailBlogClient from "./BlogDetails";

// export default function DetailBlogPage({ params }: { params: { id: string } }) {
//   return <DetailBlogClient slug={params.id} />;
// }
// import DetailBlogClient from "./BlogDetails";

// export default function DetailBlogPage() {
//   return <div>This is blog id page</div>;
// }

import { use } from "react";
import DetailBlogClient from "./BlogDetails";

export default function Blogpage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return <DetailBlogClient slug={id} />;
}
