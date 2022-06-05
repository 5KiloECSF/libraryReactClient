
export const NoMatchPage = () => {
    const Style={
        left: '50%',
        marginLeft: '-50px',
        top: '25%',
        marginTop: '50px'
        // left: '50%'
    }
    return (
        <div className="" style={Style}>
            <button
                type="button"
                id="TooltipDemo"
                className="btn-open-options btn  btn-outline-danger"
            >
                <i className="fa fa-cog fa-w-16 fa-spin fa-5x" />
            </button> <span style={{padding:'1em'}} />

            {/*<Redirect to={"/"}/>*/}
            <Link to="/">  <h3>404 - Not found </h3> </Link>


        </div>

    );
};

export default NoMatchPage