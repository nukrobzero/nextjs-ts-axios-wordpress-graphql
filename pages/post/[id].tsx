import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";

type Data = {
  post: any;
};

export default function SinglePost({ post }: Data) {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <article>
        <h1>{post.node.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.node.content }} />
      </article>
    </>
  );
}

async function getPosts() {
  const res = await fetch(`${process.env.SITE_URL}/api/getPosts`);
  return res.json();
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await getPosts();
  const posts = res?.data?.posts?.edges || [];

  const paths = posts.map((post: any) => ({
    params: { id: post?.node?.id?.toString() },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const allData = await getPosts();
  const posts = allData?.data?.posts?.edges || [];
  const post = posts.find((post: any) => post.node.id.toString() === params.id);
  return {
    props: { post },
    revalidate: 10,
  };
};
