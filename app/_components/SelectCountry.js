import React from 'react'
import { getCountries } from '@/app/_lib/data-service';

export default async function SelectCountry() {
    let countries = await getCountries();
    countries = countries.sort((a, b) => a.name.common.localeCompare(b.name.common));
    // console.log(countries[0].name.common);

  return (
    <select className='px-5 py-3 bg-slate-300 text-slate-800 w-full shadow-sm rounded-sm'>
        <option value=''>Select Country...</option>
        {countries.map((country) => (
            <option key={country.name.common} value={country.name.common}>
                {country.name.common}
            </option>
        ))}
    </select>
  )
}
