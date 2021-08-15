import axios from "axios";

class ShortUrl {

  public async createShortUrl(url:string, shortUrl?: string, expirateDate?:number ){
    const body = {
      url: url,
      shortUrl: shortUrl,
      expirateDate: expirateDate
    };

    const url_api = 'http://localhost:5000/url';

    const request = await axios.post(url_api,body);
    return request
  }

  public async getAllShortUrl(pages: number){
    const url_api = `http://localhost:5000/url/${pages}` ;
    const request = await axios.get(url_api);
    return request

  }
}
export default ShortUrl;
