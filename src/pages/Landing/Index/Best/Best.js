import React from "react";
import {Row, Col, Card} from 'antd';
// import {LocalImg} from "Constants/constants";
import {Link} from "react-router-dom";
import "./horizontal.scss"
import Scroller from "./scroller/scroller";

function Best({bestItems, filter, selectItem}) {

    const hasItems = bestItems !== undefined && bestItems.length > 0;

    const node = hasItems ? bestItems.map(item =>
        // <Col >
        <Cards
            selectItem={() => selectItem(item)}
            key={item.id}
            item={item}
        />

    ) : "no books"
    const myContainerStyle = {
        width:'100%',
        height:"auto",
        // overflowY: 'auto',
        overflowX: 'auto',
        display:'flex',
        // overflow:'auto'
        // justifyContent:"space-between",
        // flexWrap:'nowrap'
    }

    return (
        <div className="">
            {/*<div className="">*/}

                <div className="row">
                    <div className="col text-center">
                        <div className="section_title new_arrivals_title">
                            <h2>Latest </h2>
                        </div>
                    </div>
                </div>

                <div className="" style={myContainerStyle} >
                    {/*<Row gutter={[16]}>*/}
                    {node}
                    {/*</Row>*/}

                </div>

        </div>
    );

}

export default Best;
const myComponentStyle = {

    width: "300",
    marginRight: '1.5em',
}
const imgStyles = {

    width: "100%",
    marginRight: '0.5em',
}
function Cards({item, selectItem}){
    return(
        <Card
            hoverable
            style={myComponentStyle}
            cover={
                < Link onClick={() => selectItem()} to={`single/${item.id}`}>
                    <img  alt="example" src={item.poster} style={imgStyles}/>
                </Link>
                    }
         >
            < Link onClick={() => selectItem()} to={`single/${item.id}`}>
                <Card.Meta title={item.name} description={"________________ "} />

            </Link>

        </Card>
    )

}

function BestSellersItem({item, selectItem}) {
    return (
        <div className="owl-item product_slider_item card-item" style={myComponentStyle}>
            <div className="item-item" style={{width: "100%"}}>
                <div className="item discount">
                    <Link onClick={() => selectItem()} to={`single/${item.id}`}>
                        <div className="product_image">

                            <img src={item.poster} alt=""/>
                        </div>
                    </Link>

                    <div className="favorite favorite_left"/>
                    <div
                        className="product_bubble product_bubble_right product_bubble_red d-flex flex-column align-items-center">
                        <span>{item.page_size}</span>
                    </div>
                    <div className="product_info">

                        <h6 className="product_name">
                            < Link onClick={() => selectItem()} to={`single/${item.id}`}>
                                {item.name}
                            </Link>
                        </h6>
                        <div className="product_price">
                            {/*$520.00<span>$590.00</span>*/}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}
