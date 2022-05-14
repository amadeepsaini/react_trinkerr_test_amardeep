import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Search = () => {
	const [token, setToken] = useState("");
	const [limit, setLimit] = useState(20);
	const [qeuryString, setQueryString] = useState("home");
	const [data, setData] = useState([]);

    const fetchToken = () => {
		axios
			.get("http://3.108.244.88:5000/api/user-access-token")
			.then((result) => {
				setToken(result.data.token);
			})
	}

	const fetchData = ()=> {
		if(token !==""){
			axios
				.get(`http://3.108.244.88:5000/api/data?search_string=${qeuryString}`,{
					headers: {
						"user-access-token" : token
					}
				})
				.then((result) => {
					setData(result.data);
				})
		}
	}
	
	const handleSearch = (e) =>{
		setQueryString(e.target.value);
	}

	const handleLimit = (e) =>{
		setLimit(e.target.value);
	}

	useEffect(fetchToken, []);
	useEffect(fetchData, [token, qeuryString]);

	const sliceLimit = limit==""? 100 : limit;
	const jxsData = data.slice(0, sliceLimit).map((row, rowId) => {
		return (
			<tr key={rowId}>
				{row.map((value, id)=>{
					return <td key={id}>{value}</td>
				})}
			</tr>
		)
	})

    return (
		<>
    	<h1>Search Dashboard</h1>
			<span> Search Query </span><input id="search_query" placeholder='Type your query here' onChange={(e) => handleSearch(e)}></input>
			<span> No of rows </span><input id="data-limit" placeholder='Enter No of data limit' value={limit} onChange={(e) => handleLimit(e)}></input>
			<table className='table data-background table-hover table-responsive'>
				<tbody>{jxsData}</tbody>
			</table>
		</>
    );
}

export default Search;