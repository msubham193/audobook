import { create } from 'zustand';

export const useCountryStore = create((set)=>(
  {
    countries:{},
    fetchCountry: async () => {
        await fetch('https://restcountries.com/v3.1/all').then(response =>
            response.json().then(data => {
              let countriesData = data.map(
                (item: {idd: any; name: {common: any}; flags: {png: any}}) => {
                  return {
                    name: item.name.common,
                    flag: item.flags.png,
                    code: item.idd.root + item.idd.suffixes,
                  };
                },
              );

              set((state: any)=>({...state, countries:countriesData}));
            }),
          );



    }

}));

// const useFishStore = create((set) => ({
//     fishies: {},
//     fetch: async (pond) => {
//       const response = await fetch(pond)
//       set({ fishies: await response.json() })
//     },
//   })),