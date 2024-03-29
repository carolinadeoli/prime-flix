import { useEffect, useState} from 'react';
import './favoritos.css';
import { Link } from 'react-router-dom';
function Favoritos(){
    const [filmes, setFilmes] =useState([])

    useEffect(()=>{
        const minhaLista = localStorage.getItem("@primeflix");
        setFilmes(JSON.parse(minhaLista) || [])

    }, [])
    
    function excluirFilme(id){
       let filtroFilmes = filmes.filter((item)=>{ //filter devolve os filmes que passam na condição
        return(item.id !==id) //devolve todos os itens menos o que se está clicando
       })
       setFilmes(filtroFilmes);
       localStorage.setItem("@primeflix", JSON.stringify(filtroFilmes))
    }
    return(
        <div className='meus-filmes'>
            <h1>Meus Filmes</h1>
            {filmes.length === 0 && <span>Você não possui filmes salvos.</span>}
            <ul>
                {filmes.map((item) =>{
                    return(
                        <li key={item.id}>
                            <span>{item.title}</span>
                            <div>
                                <Link to={`/filme/${item.id}`}>Ver Detalhes</Link>
                                <button onClick={()=>excluirFilme(item.id)}>Excluir</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Favoritos;