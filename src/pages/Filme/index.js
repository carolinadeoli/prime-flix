import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './filme.css'
import api from '../../services/api';

function Filme(){
    const { id } = useParams(); //1
    const navigate = useNavigate();
    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(()=>{ //2
        async function loadFilme(){
            await api.get(`/movie/${id}`, {
                params:{
                    api_key: "1d926f5a9bfdd6391523177e55567010",
                    language:'pt-BR',

                }
            })
            .then((response)=>{ //caso de sucesso
                setFilme(response.data);
                setLoading(false);
            })
            .catch(()=>{ //caso de erro
                navigate("/", { replace: true})
                return;
            })
        }
        loadFilme();

        return () =>{

        }
    }, [navigate, id])
    
    function salvarFilme(){
        const minhaLista = localStorage.getItem("@primeflix") //chave para o localStorage

        let filmesSalvos = JSON.parse(minhaLista) || []; //converter

        const hasFilme = filmesSalvos.some((filmesSalvos)=> filmesSalvos.id === filme.id) //some: verificar se tem pelo menos um item de que se quer comparar

        if(hasFilme){
            alert('Esse Filme JÁ está na lista');
            return;
        }
        
        filmesSalvos.push(filme);
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));//transformar para string
        alert('Filme salvo com sucesso!');

    }
    
    if(loading){
        return(
            <div className ='filme-info'>
                <h1>Carregando detalhes...</h1>
            </div>
        )
    }
    return(
        <div className='filme-info'>
            <h1>{filme.title}</h1>
            <img src={`http://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/> 
            
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>

            <strong>Avaliação: {filme.vote_average} /10</strong>

            <div className='area-buttons'>
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target='_blank' href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>Trailer</a>
                </button>
            </div>

        </div>
    )
}

export default Filme;