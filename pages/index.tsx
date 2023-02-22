import { Inter } from "@next/font/google";
import { GetStaticProps } from "next";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

type Data = {
  posts: any;
};

export default function Home({ posts }: Data) {
  return (
    <>
      <h1>nextjs-ts-axios-wordpress-graphql</h1>
      <div>
        <ul>
          {posts.map((post: any, idx: any) => (
            <li key={idx}>
              <Link href={`/post/${post.node.id}`}>{post.node.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

async function getPosts() {
  const res = await fetch(`${process.env.SITE_URL}/api/getPosts`);
  return res.json();
}

export const getStaticProps: GetStaticProps = async () => {
  const allData = await getPosts();
  const posts = allData?.data?.posts?.edges || []; // access the posts array directly from the response
  return {
    props: { posts },
    revalidate: 10,
  };
};
