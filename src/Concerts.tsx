import React from 'react';
import './App.css';
import moment from 'moment'

import { Concert } from './types'
import { useQuery } from 'react-query'

import { searchArtistName } from './spotify';
import SpotifyTrackModal from './SpotifyTrackModal';
import spotifyLogo from './spotify.png'

interface ConcertProps {
    concert: Concert
}

function Concerts({ concert }: ConcertProps) {
    const bandName = concert.band_name
    const formattedConcertDate = moment.utc(concert.concert_date).format('MM/DD/YYYY')
    const concertDateDay = moment.utc(concert.concert_date).format('dddd').substring(0,3)
    const [spotifyTrackModalIsOpen, setSpotifyTrackModalIsOpen] = React.useState(false)
    const { data, isLoading, error } = useQuery([concert.band_name, bandName], () => searchArtistName(bandName))
    let spotifyId = ''
    if(data === undefined) {
        return <></>
    }
    if (data?.artists.items.length === 0 ) {
        return <></>
    }
    spotifyId = data?.artists.items[0].id
    function handleTrackModalButtonClicked() {
        setSpotifyTrackModalIsOpen(true)
    }

    function handleCloseTrackModalButtonClicked() {
        setSpotifyTrackModalIsOpen(false)
    }

    if (isLoading) return <p>Loading...</p>

    if (error) return <p>Error...</p>

    return (
        <>
            <div key={concert.concert_id} className="flex flex-col content-center w-full mb-5 bg-card-background border-2 border-card-button rounded-xl drop-shadow-xl md:flex-row md:max-w-xl">
                {data!.artists.items[0].images.length > 0  &&
                    <img className="object-cover w-full rounded-t-lg md:h-52 md:w-48 md:rounded-none md:rounded-l-lg" src={data!.artists.items[0].images[0].url} alt="" />}
                <div className="flex flex-col justify-between p-4 leading-normal mr-4">
                    <h5 className="mb-1 text-2xl font-bold tracking-tight text-black">
                        {concert.band_name}
                    </h5>
                    <p className="font-normal text-gray-700">{concertDateDay + ' ' + formattedConcertDate}</p>
                    <p className="font-normal text-gray-700">{concert.venue_name}</p>
                    <p className="font-normal text-gray-700">{concert.showtime}</p>
                    <div className="flex">
                        <a href={concert.ticket_link}>
                            <button type="button" className="text-white mt-4 bg-card-button hover:bg-card-button-hover focus:ring-4 focus:ring-blue-300 font-medium rounded-xl text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none">Get Tickets</button>
                        </a>   
                        {spotifyId !== '' && 
                            <button type="button" onClick={handleTrackModalButtonClicked} className="mt-2 ml-4">
                                <img src={spotifyLogo} alt="" />
                            </button>
                        }
                    </div>
                    
                </div>
                
                {spotifyTrackModalIsOpen && 
                <SpotifyTrackModal 
                    isOpen={spotifyTrackModalIsOpen} 
                    onClose={handleCloseTrackModalButtonClicked}
                    spotifyId={spotifyId}
                />}
            </div>
        </>
    );
}

export default Concerts;
