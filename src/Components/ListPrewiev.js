function ListPrewiev({list, ...props}) {
    return (
        <div>
            ----------------------------------------
            <h1>List {list.listName}</h1>
            <h2>Created: {list.created}</h2>
            ----------------------------------------
        </div>
    )
}

export default ListPrewiev;