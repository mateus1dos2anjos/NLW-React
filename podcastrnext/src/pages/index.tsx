// SPA
// SSR
// SSG

import { useEffect } from "react"

export default function Home(props) {

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
export async function getStaticProps() {
  const response = await fetch('http://localhost:3333/episodes')
  const data = await response.json()

  return {
    props: {
      episodes: data,
    },
    revalidate: 60 * 60 * 8,
  }


}