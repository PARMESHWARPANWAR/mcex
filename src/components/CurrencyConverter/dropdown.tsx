/* eslint-disable react/prop-types */
import React from 'react';
import { HiOutlineStar, HiStar } from "react-icons/hi2";

interface CurrencyDropdownProps {
  currencies: string[],
  currency: string,
  setCurrency: (value: string) => void,
  favorites: string[],
  handleFavorite: (value: string) => void,
  title?: string
}

const CurrencyDropdown: React.FC<CurrencyDropdownProps> = ({
  currencies,
  currency,
  setCurrency,
  favorites,
  handleFavorite,
  title = "",
}) => {
  const isFavorite = (curr: string) => favorites.includes(curr);

  return (
    <div>
      <label
        htmlFor={title}
        className="block text-sm font-medium text-gray-700"
      >
        {title}
      </label>

      <div className="mt-1 relative">
        <select
          id={title}
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {favorites.map((curr) => (
            <option className="bg-gray-200" value={curr} key={curr}>
              {curr}
            </option>
          ))}
          <option disabled>──────────</option>
          {currencies
            .filter((c) => !favorites.includes(c))
            .map((curr) => (
              <option value={curr} key={curr}>
                {curr}
              </option>
            ))}
        </select>

        <button
          type="button"
          onClick={() => handleFavorite(currency)}
          className="absolute inset-y-0 right-0 pr-5 flex items-center text-sm leading-5"
        >
          {isFavorite(currency) ? <HiStar /> : <HiOutlineStar />}
        </button>
      </div>
    </div>
  );
};

export default CurrencyDropdown;