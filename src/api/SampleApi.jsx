import axios from 'axios';

const apiUrl = "https://api.sampleapis.com/beers/ale";

 const beerData = async () => {
   try {
      const response = await axios.get(apiUrl);
      return response.data;
   } catch (error) {
      console.error("Error fetching data", error);
      return [];
   }
};

export default beerData;
