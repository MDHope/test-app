import { Card } from "../Components";
import { Story } from "../interfaces/stories.interface";
import { fetcher } from "../helpers/fetcher";
import useSWR from "swr";



const Home: React.FC = (): JSX.Element => {
  const { data, error } = useSWR("/api/stories", fetcher);

  if (error) return <div>Ошибка при загрузке</div>;
  if (!data) return <div>Загружаем...</div>;

  return (
    <div className="mainContainer">
      {data.map(({ image, title, id }: Story, index: number) => (
        <Card id={id} image={image} title={title} key={index} />
      ))}
    </div>
  );
};

export default Home;

// ! Код для статической генерации страниц

// interface HomeProps {
//   data: Story[];
// }

// export const getStaticProps = async () => {
//   const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/stories`);
//   const data: Array<Story> = await response.json();

//   return {
//     props: {
//       data,
//     }
//   }
// }
