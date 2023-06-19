import React from 'react';
import { X } from 'react-feather';
import { useQuery } from 'react-query';
import { getArtistTopTrack } from './spotify';

interface SpotifyTrackModalProps {
    isOpen: boolean,
    onClose: React.MouseEventHandler<HTMLButtonElement>,
    spotifyId: string
}

function SpotifyTrackModal({ isOpen, onClose, spotifyId }: SpotifyTrackModalProps) {
    const { data, isLoading, error } = useQuery([spotifyId, spotifyId], () => getArtistTopTrack(spotifyId))
    const topTrackId = data?.tracks[0].id
    const embedUrl = `https://open.spotify.com/embed/track/${topTrackId}`
    if(error) return <p>error...</p>
    return (
        <>
            <div
                className={`
                fixed inset-0 flex justify-center items-center
                transition-colors
                ${isOpen ? "visible bg-black/20" : "invisible"}
                `}
                >
                {isLoading ? <p>loading...</p> :
                <div
                    className={`
                bg-white rounded-xl shadow p-6 transition-all
                ${isOpen ? "scale-100 opacity-100" : "scale-125 opacity-0"}
                `}
                >
                    <button onClick={onClose} className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600">
                        <X />
                    </button>
                    <iframe title="title " src={embedUrl} width="100%" height="352" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
                </div>
                } 
            </div>
        </>

    )
}

export default SpotifyTrackModal