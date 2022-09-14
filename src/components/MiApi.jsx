import React, { useEffect, useState } from 'react'
import Buttons from './Buttons'
import Cards from './Cards'
import Header from './Header'
import Search from './Search'







function MiApi() {
    /* Buttones prev y next */

    const [info, setInfo] = useState({})
    const [characters, setCharacters] = useState([])
    const [search, setSearch] = useState("")
    /* Crear referencia sección API */
    const apiURL = 'https://rickandmortyapi.com/api/character'

    /* Crear Función para obtener personajes */

   /*  const  */async function getcharacters(apiURL) {
        const res = await fetch(apiURL)
        const data = await res.json()
       /*  setCharacters(data.results) */
        const sortData = data.results.sort((a,b) => {
            if (a.name < b.name) {
              return -1;
            } if (a.name > b.name) {
              return 1;
            }
            return 0;
          });
      
          setCharacters(sortData);
        setInfo(data.info)
        return data

        /* fetch(url).then(response => response.json()).then(data => setCharacters(data.results))
            .catch(error => console.log(error)) */
    }
    /* Buttons */
   /*  async function alive() {
        const data = await getcharacters(apiURL);
        const sortData=data.results.sort((a, b) => {
            if (a.results.status < b.results.status) {
              return -1;
            } if (a.results.status > b.results.status) {
              return 1;
            }
            return 0;
          });
      
          setCharacters(sortData);

    

    } */
        

    const onPrevious = () => {
        getcharacters(info.prev)

    }

    const onNext = () => {
        getcharacters(info.next)

    }

    /* SEARCH */
    const handleSearch = (e) => {

        setSearch(e.target.value);
    }



    const listCharacters = !search
        ? characters
        : characters.filter((x) => x.name.toLowerCase().includes(search.toLocaleLowerCase()));

    useEffect(() => {
        getcharacters(apiURL)

    }, [])

    return (
        <>
            <Header brand='Rick and Morty' />

            {/* Buscador */}
            {/* SEARCH SECTION */}
            <div className='text-center p-10 bg-pink-400 mt-3 h-screen'>

                <input onChange={(e) => handleSearch(e)}
                    type='search'
                    value={search}
                    className='bg-green px-3 gap-3 rounded-md mx-3'
                    placeholder='Search by name'
                />
                <button
                type="button"
                aria-label="Submit Search"
                
               
                >Alive</button>








            </div>

            {/* <Search handleSearch={handleSearch} /> */}



            <div className='conteiner m-4'>

                <Buttons prev={info.prev}
                    next={info.next}
                    onPrevious={onPrevious}
                    onNext={onNext} />





                {/* List with search */}



                <div className='row'>

                    {

                        listCharacters.map((item, i) => (
                            <div key={i} className='col mb-3'>
                                <div className='card' style={{ minWidth: '200px' }}>
                                    <img src={item.image} alt="" />
                                    <div className='card-body'>
                                        <h3 className='card-title'>{item.name}</h3>
                                        <hr />
                                        <p>Status: {item.status}</p>
                                        <p>Species: {item.species} </p>
                                        <p>Gender: {item.gender} </p>
                                        <p>Origin: {item.origin.name} </p>
                                        <p>Location: {item.location.name} </p>



                                    </div>
                                </div>
                            </div>


                        ))
                    }




                </div>



                <Buttons prev={info.prev} next={info.next}
                    onPrevious={onPrevious}
                    onNext={onNext} />


            </div>


        </>




    )
}

export default MiApi