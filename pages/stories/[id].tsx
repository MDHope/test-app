import useSWR from "swr";
import { fetcher } from "../../helpers/fetcher";
import { useRouter } from "next/router";
import { StoryItem } from "../../Components";

const StoryPage: React.FC = (): JSX.Element => {
  const { query } = useRouter();

  const { data, error } = useSWR(
    () => (query.id ? `/api/stories/${query.id}` : null),
    fetcher
  );

  if (error) return <div>{error.message}</div>;
  if (!data) return <div>Загружаем...</div>;

  const { title, description, image, content } = data;

  return (
    <StoryItem
      title={title}
      description={description}
      image={image}
      content={content}
    />
  );
};

export default StoryPage;

// ! Код для статической генерации страниц.

// import { Story } from "../../interfaces/stories.interface";
// import { GetStaticPaths, GetStaticProps, GetStaticPropsResult } from "next";

// interface StoryPageProps {
//   story: Story;
// }

// export const getStaticPaths: GetStaticPaths = async () => {
//   const response = await fetch(process.env.NEXT_PUBLIC_DOMAIN + "/api/stories");
//   const stories: Array<Story> = await response.json();

//   const paths = stories.map((story) => ({
//     params: { id: story.id },
//   }));

//   return {
//     paths,
//     fallback: false,
//   };
// };

// export const getStaticProps: GetStaticProps<StoryPageProps> = async ({
//   params,
// }): Promise<GetStaticPropsResult<StoryPageProps>> => {
//   if (!params) {
//     return {
//       notFound: true,
//     };
//   }
//   try {
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_DOMAIN}/api/stories/${params.id}`
//     );
//     const story: Story = await response.json();

//     return {
//       props: { story },
//     };
//   } catch (error) {
//     return {
//       notFound: true,
//     };
//   }
// };
