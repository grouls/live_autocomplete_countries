import { FC, useState, useEffect } from 'react';

import './style.css';
// https://restcountries.com/v3.1/name/germany
type nameProps = {
  name: {
    common: string;
  };
  index: number;
};

const List = ({ name, index }: nameProps) => {
  const handleClick = (e) => {
    console.log(e.target.name);
  };
  return (
    <li className={`listItem${index}`}>
      <button name={name.common} onClick={(e) => handleClick(e)} type="button">
        {name.common}
      </button>
    </li>
  );
};

export const App: FC = () => {
  const [country, setCountry] = useState('');
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (country) {
          const response = await fetch(
            `https://restcountries.com/v3.1/name/${country}`
          );
          const json = await response.json();
          setList(json);
        }
      } catch (e) {
        console.log('Error:' + e);
      }
    };
    setLoading(true);
    fetchData();
    setLoading(false);

    return () => {};
  }, [country]);

  const handleChange = (e) => {
    setCountry(e.target.value);
  };

  return (
    <div>
      <input
        aria-label="Enter country in here"
        value={country}
        type="input"
        onChange={(e) => handleChange(e)}
      />
      <div>
        {loading ? (
          <>Loading....</>
        ) : (
          list.length !== 0 &&
          list.map((item, index) => <List name={item.name} index={index} />)
        )}
      </div>
    </div>
  );
};
