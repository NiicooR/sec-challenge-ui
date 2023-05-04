import React, { useContext, useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import { GlobalContext } from '../context/global.context';

export const WalletsTable = () => {
  const useGlobalContext = useContext(GlobalContext);

  const [orderedData, setOrderedData] = useState<Wallet[]>(useGlobalContext.wallets);

  useEffect(() => {
    if (useGlobalContext.wallets.length) {
      setOrderedData(sort('id', true, useGlobalContext.wallets));
    }
  }, [useGlobalContext]);

  const handleSorting = (name: keyof Wallet, isDesc: boolean) => {
    const newOrderedData = sort(name, isDesc, [...orderedData]);
    setOrderedData(newOrderedData);
  };

  const sort = (name: keyof Wallet, isDesc: boolean, data: Wallet[]) => {
    const newOrderedData = [...data];
    newOrderedData?.sort((a, b) => {
      let r = 0;
      switch (typeof a[name]) {
        case 'string':
          const stringA = a[name] as string;
          const stringB = b[name] as string;
          r = isDesc ? stringA.localeCompare(stringB) : stringB.localeCompare(stringA);
          break;
        case 'number':
        case 'boolean':
          const numberA = a[name] as number;
          const numberB = b[name] as number;
          r = isDesc ? numberA - numberB : numberB - numberA;
          break;
        default:
          break;
      }
      return r;
    });
    return newOrderedData;
  };

  if (!orderedData.length) return null;

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>
            <ColumnHeader name={'#'} sort={handleSorting} />
          </th>
          <th>
            <ColumnHeader name={'Wallet'} sort={handleSorting} />
          </th>
          <th>
            <ColumnHeader name={'Favorite'} sort={handleSorting} />
          </th>
        </tr>
      </thead>
      <tbody>
        {orderedData.map((row) => (
          <tr
            key={row.id}
            onClick={() => {
              useGlobalContext.selectWallet(row.address);
            }}
          >
            <td>{row.id}</td>
            <td>{row.address}</td>
            <td>
              <Form.Check
                type={'checkbox'}
                checked={row.isFavorite}
                onChange={(e) => useGlobalContext.updateFavoriteWallet(row.id, !row.isFavorite)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export const ColumnHeader = ({
  name,
  sort,
}: {
  name: string;
  sort: (columnName: keyof Wallet, isDesc: boolean) => void;
}) => {
  const [isDesc, setIsDesc] = useState(true);

  useEffect(() => {
    const attribute = () => {
      let r: keyof Wallet = 'id';
      switch (name) {
        case '#':
          r = 'id';
          break;
        case 'Wallet':
          r = 'address';
          break;
        case 'Favorite':
          r = 'isFavorite';
          break;
      }
      return r;
    };
    sort(attribute(), isDesc);
  }, [isDesc, name]);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div>{name}</div>
      <div style={{ cursor: 'pointer' }} onClick={() => setIsDesc(!isDesc)}>
        {isDesc ? <i className="bi bi-caret-down-fill"></i> : <i className="bi bi-caret-up-fill"></i>}
      </div>
    </div>
  );
};
