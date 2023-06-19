import axios from 'axios'
import qs from 'qs'
import { Buffer } from 'buffer'
import { SpotifyArtistSearchObject, SpotifyTopTrackResponse } from './types'

const client_id = 'f9a12d5be2664fe5aa979657fc970a2c'
const client_secret = 'f07c6a25429c4f9eaf88449744e822e8'
const auth_token = Buffer.from(`${client_id}:${client_secret}`, 'utf-8').toString('base64');
const url = 'https://accounts.spotify.com/api/token'
const data = qs.stringify({'grant_type':'client_credentials'});

export const getAuthToken = async () => {
    try {
        const response = await axios.post(url, data, {
            headers: { 
                'Authorization': `Basic ${auth_token}`,
                'Content-Type': 'application/x-www-form-urlencoded' 
              }
        })
        return response.data.access_token
    } catch (error) {
        console.log(error)
    }
}

export async function searchArtistName(name: string): Promise<SpotifyArtistSearchObject> {
    const accessToken = await getAuthToken()
    const api_url = `https://api.spotify.com/v1/search?query=${name}&type=artist&locale=en-US%2Cen%3Bq%3D0.9&offset=0&limit=1`
    const response = await axios.get(api_url, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })
    return response.data
}

export async function getArtistTopTrack(artistId: string): Promise<SpotifyTopTrackResponse> {
  const accessToken = await getAuthToken()
  const api_url = `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`
  const response = await axios.get(api_url, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
  return response.data
}