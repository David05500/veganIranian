import Router from 'next/router';
import {useEffect} from 'react';

function QuerySample({ query: {search} }) {

    const updateQuery = (newQuery) => {
        Router.push({
            pathname: '/querytest',
            query: { search: encodeURI(newQuery) },
        });
    };

    useEffect(() => {
        if (search){
            console.log('Initial query / update caught!');
        }
    }, [search]);

    return (
        <div>
            <h2>Current query is {search}</h2>
            <button onClick={() => { updateQuery('321') }}>Update query</button>
        </div>
    )
}

QuerySample.getInitialProps = ({query}) => {
    return {query}
};

export default QuerySample