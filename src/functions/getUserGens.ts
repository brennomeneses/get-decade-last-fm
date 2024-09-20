import Bottleneck from "bottleneck";
import getUser from "../services/user";
import getSong from "../services/song";
import { getDateRange } from "./getRange";

export const getUserGens = async (user: string) => {
  const limiter = new Bottleneck({
    minTime: 1000
  });

  const data = await getUser(user);

  console.log(data);

  if(typeof data === 'string'){
    return data;
  }

  const formatedAlbums = data.album.map((album) => ({ mbid: album.mbid, count: Number.parseInt(album.playcount), name: album.name })).filter(album => album.mbid !== '');

  const throttledFetch = limiter.wrap(getSong);
  
  const albums = await Promise.all(formatedAlbums.map(async (album) => {
    try {
      const { mbid, count } = album;
      const song = await throttledFetch(mbid);
      return { year: song.date.split('-')[0], count };
    } catch (error) {
      console.log(error);
    }
  }));

  const result = albums.filter(album => album).reduce((acc, album) => {
    const range = getDateRange(album!.year);
    const found = acc.find(e => e.range === range);

    if(found){
      found.count += album!.count;
    } else {
      acc.push({ range, count: album!.count });
    }

    return acc;
  }, [] as { range: string, count: number }[]);

  return result
}