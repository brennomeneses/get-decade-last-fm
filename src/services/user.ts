import { api } from ".";
import { Topalbums } from "../@types/apiUserResponse";

const getUser = async (user: string): Promise<Topalbums> => {

  const params = new URLSearchParams();
  params.append('method', 'user.getTopAlbums');
  params.append('user', user);
  params.append('api_key', import.meta.env.VITE_LAST_FM_API_KEY);
  params.append('format', 'json');
  params.append('limit', '20');
  params.append('period', '6month');

  const response = await api.get('', { params })

  return response.data.topalbums
}

export default getUser