import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './Context';
import fetchApi from '../services/api';
// https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/sort

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [counter, setCouter] = useState(0);
  const [columns, setColumns] = useState([]);
  const [newColumns, setNewColumns] = useState([]);
  const [filter, setFilter] = useState({
    filters: {
      filterByName: {
        name: '',
      },
      filterByNumericValues: [],
      order: {
        column: 'name',
        sort: 'ASC',
      },
    },
  });

  const columnText = ['name', 'terrain', 'films', 'url'];
  const { column, sort } = filter.filters.order;
  if (sort === 'ASC') {
    if (columnText.includes(column)) {
      data.sort((a, b) => (
        +(a[column] > b[column]) || +(a[column] === b[column]) - 1
      ));
    } else {
      data.sort((a, b) => Number(a[column]) - Number(b[column]));
    }
  } else if (sort === 'DESC') {
    if (columnText.includes(column)) {
      data.sort((a, b) => (
        +(a[column] < b[column]) || +(a[column] === b[column]) - 1
      ));
    } else {
      data.sort((a, b) => Number(b[column]) - Number(a[column]));
    }
  }

  let arrayData = data.reduce((__, acc) => acc, []);
  arrayData = Object.keys(arrayData).filter((key) => key !== 'residents');

  async function setPlanets() {
    try {
      const response = await fetchApi();
      setData(response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setPlanets();
  }, []);

  useEffect(() => {
    setColumns(['population',
      'orbital_period', 'diameter', 'rotation_period', 'surface_water']);
  }, []);

  return (
    <StarWarsContext.Provider
      value={ {
        arrayData,
        filter,
        setFilter,
        data,
        setCouter,
        counter,
        columns,
        setColumns,
        newColumns,
        setNewColumns,
      } }
    >
      {children}
    </StarWarsContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
