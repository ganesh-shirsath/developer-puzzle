import { environment } from '../../environments/environment';
const axios = require('axios');
export class Stocks {
  public static fetchQuotes = async (symbol, period) => {
    try {
      const url = `${environment.apiURL}/beta/stock/${symbol}/chart/${period}?token=${environment.apiKey}`;
      console.log("URl....." + url);
      const response = await axios({
        method: 'GET',
        url: url
      });
      return response.data;
    } catch (error) {
      console.error("Error while featching stocks: ", error);
      return error;
    }
  }
}
