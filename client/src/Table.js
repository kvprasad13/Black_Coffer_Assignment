const Table = ({ data }) => {

    const attributes = ['country', 'topic', 'region', 'sector', 'source', 'pestle', 'intensity', 'likelihood', 'relevance', 'start_year', 'end_year'];
    // attributes.shift();


    return <table className="table table-striped table-responsive table-fit">
        {data && data.length > 0 && <thead>
            <tr scope='row' >
                <th>S.No</th>
                {attributes.map((key, index) => <th scope="col" key={index}>{(key[0].toUpperCase() + key.slice(1).replace('_', " "))}</th>)}
            </tr>
        </thead>}
        <tbody>
            {data.map((object, index) => <tr scope="row" key={index}>
                {/* {console.log(object._id)} */}
                <td>{index + 1}</td>
                {attributes.map((attribute) => <td scope="col" className="">{object[attribute]}</td>)}
            </tr>)}

        </tbody>

    </table >
}
export default Table;