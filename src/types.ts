export interface Concert {
    concert_id: number,
    venue_id: number,
    band_name: string,
    venue_name: string,
    showtime: string,
    concert_date: Date,
    ticket_link: string
  }

type SpotifyImageObject = {
  url: string,
  height: number | null,
  width: number | null
}

export interface SpotifyArtistSearchInfo {
  external_urls: {
    spotify: string
  },
  followers: {
    href: string | null,
    total: number
  },
  genres: string[],
  href: string,
  id: string,
  images: SpotifyImageObject[],
  name: string,
  type: string,
  uri: string
}

export type SpotifyArtistSearchObject = {
  artists: {
    items: SpotifyArtistSearchInfo[]
  }
}

export interface SpotifyTrackObject {
  id: string
}

export type SpotifyTopTrackResponse = {
  tracks: SpotifyTrackObject[]
}
