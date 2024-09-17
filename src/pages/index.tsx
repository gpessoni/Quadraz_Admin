import Head from "next/head"

export default function Home() {
    return (
            <Head>
                <title>Quadraz Online</title>
                <meta name="description" content="Reserve sua jogada em um clique! ⚽" />]
                <h1>Teste</h1>
            </Head>
    )
}

export async function getStaticProps() {
    return {
        props: {},
    }
}
