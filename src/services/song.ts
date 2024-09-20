import { musicBrainz } from "./musicBrainz";
import { AlbumAPIResponse } from "../@types/apiAlbumResponse";

const getSong = async (mbid: string): Promise<AlbumAPIResponse> => {

  const response = await musicBrainz.get(`release/${mbid}?fmt=json`)

  return response.data
}

export default getSong