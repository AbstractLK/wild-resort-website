import React from 'react'
import { getCountries } from '@/app/_lib/data-service';

export default async function SelectCountry({country}) {
    let countries = await getCountries();
    // countries = countries.sort((a, b) => a.name.localeCompare(b.name.common));
    // const flag = countries.find((c) => c.name.common === country)?.flags.svg ?? "";

  return (
    <select name="country" defaultValue={country} key={country} className='px-5 py-3 bg-slate-300 text-slate-800 w-full shadow-sm rounded-sm'>
        <option value='' key=''>Select Country...</option>
        {countries.map((country) => (
            <option key={country.name} value={country.name}>
                {country.name}
            </option>
        ))}
    </select>
  )
}
