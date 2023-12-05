import { useEffect, useState} from 'react'; //ciclo de vida
import api from '../../services/api';
import { Link } from 'react-router-dom';
import './home.css';
//url da api: /movie/now_playing?api_key=1d926f5a9bfdd6391523177e55567010&language=pt-BR

function Home(){
    const [filmes, setFilmes] = useState([]); 
    const [loading, setLoading] = useState(true); //se true aparece o 'carregando filmes'

    //1
    useEffect(()=>{
        async function loadFilmes(){ //nela se busca a API
            const response = await api.get('/movie/now_playing',{ 
                params:{
                    api_key: "1d926f5a9bfdd6391523177e55567010",
                    language:'pt-BR',
                    page:1,
                }
            })
            setFilmes(response.data.results.slice(0,10)) //slice para colocar 10 filmes
            setLoading(false); // se falso carrega normal
        }
        loadFilmes();
    },[])

    //3
    if(loading){ //se loading true
        return(
            <div className='loading'>
                <h2> Carregando Filmes...</h2>
            </div>
        )
    }
    //2
    return(
        <div className='container'>
            <div className='lista-filmes'>
                {filmes.map((filme)=>{
                    return(
                        <article key={filme.id}> 
                           <strong>{filme.title}</strong> 
                           <img src={`http://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title}/> 
                           <Link to={`/filme/${filme.id}`}>Acessar</Link>                      
                        </article>
                    )
                })}

            </div>
            
        </div>
    )
}

export default Home;