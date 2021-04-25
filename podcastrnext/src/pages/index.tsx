import { GetStaticProps } from "next";
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR'
import { api } from "../services/api";
import { convertDuractionToTimeString } from "../utils/convertDuractionToTimeString";

// SPA
// SSR
// SSG

type Episode = {
  id: string;
  title: string;
  menbers: string;
  published_at: string;
  // ...
}

type HomeProps = {
  episodes: Episode[];
}

export default function Home(props: HomeProps) {

  //console.log(props.episodes)
  // SPA
  // useEffect(() => {
  //   fetch('http://localhost:3333/episodes')
  //     .then(response => response.json())
  //     .then(data => console.log(data))
  // }, [])

  return (

    <div>
      <h1>Index</h1>
      <p>{JSON.stringify(props.episodes)}</p>
    </div>


  )
}

// SSR: o conteúdo da página vai ta sempre disponível pra quando for carregado
// export async function getServerSideProps() {

//SSG: o conteúdo da página vai ser estática durante um tempo determinado, e só vai ser carregado uma vez durante esse tempo.
export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc'
    }
  })

  const episodes = data.map(episode => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), 'd MMM yy', { locale: ptBR }),
      duration: Number(episode.file.duration),
      durationAsString: convertDuractionToTimeString(Number(episode.file.duration)),
      description: episode.description,
      url: episode.file.url,
    };
  })

  return {
    props: {
      episodes,
    },
    revalidate: 60 * 60 * 8,
  }
}

// get: buscar, listar
// post: salvar, criar, cadastrar
// put ou patch: atualizar 
// delete: excluir