import React, { useState, useEffect }  from 'react';
import DataGrid, {
  Column,
  Pager,
  Paging,
  FilterRow,
  Lookup,
  Editing,
  Popup,
  Form
} from 'devextreme-react/data-grid';
import { Item } from 'devextreme-react/form';

import CustomStore from 'devextreme/data/custom_store';


const url = 'https://localhost:44387/api/Billing';

const dataSource = new CustomStore({
  key: 'BillingId',
  load: () => sendRequest(`${url}/GetBillings`)
});

function sendRequest(url) {
  return fetch(url, {
      method: 'GET',
      credentials: 'include'
    })
    .then(result => result.json().then(json => {

      if (result.ok)
          return json;

      throw json.Message;
    }));  
}

const columns = ['billingProcessId', 'billingRecordId'];

export default function Task() {

  const [products, setProducts] = useState([]);

    

    useEffect(() => {

        fetch(`${url}/GetBillings`)
            .then(response => response.json())
            .then(data => {
                setProducts(data);
            });

    },[]);

    console.log(products);

  return (
    <React.Fragment>
      <h2 className={'content-block'}>Billing</h2>

      <DataGrid
        className={'dx-card wide-card'}
        dataSource={products}
        showBorders={false}
        focusedRowEnabled={true}
        defaultFocusedRowIndex={0}
        columnAutoWidth={true}
        columnHidingEnabled={true}

        keyExpr="billingProcessId"
        defaultColumns={columns}
      >
        
      </DataGrid>
    </React.Fragment>
)}


