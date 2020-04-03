import React, {Component, useState, useEffect} from 'react';
import {useQuery} from '@apollo/react-hooks';

import {SEARCH} from "./graphql/sql";
import {useDebounce} from './hooks/Debounce'
import './style/index.css'

function App() {
    const [val, setVal] = useState('');
    const [search, setQuery] = useState('');

    const [cancel] = useDebounce(() => {
        setQuery(val)
    }, 500, [val]);

    const {loading, error, data} = useQuery(SEARCH, {
        variables: {
            queryStr: search
        }
    });

    const handleChange = (e) => {
        setVal(e.target.value)
    }

    return (
        <>
        <h5 className="header">GitHub Search Demo</h5>
        <input className='search' placeholder="输入..." onChange={handleChange} value={val}/>
        <div className="list">
            {
                error ?
                    <div>{JSON.stringify(error)}</div>
                    :
                    loading ?
                        <div>Loading...</div>
                        :
                        data && data.search && data.search.nodes.length > 0 ? data.search.nodes.map((item, index) => {
                                return <div className="item" key={item.id || index}>
                                    <div className='imgBox'><img src={item.avatarUrl} alt={item.name || 'pic'}/></div>
                                    <div>{item.name}</div>
                                    <div>{item.company}</div>
                                </div>
                            })
                            :
                            <div>暂无数据</div>
            }
        </div>
        </>
    )
}

export default App;