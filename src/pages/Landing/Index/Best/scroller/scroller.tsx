import React from "react";
// import ReactDOM from "react-dom";

// import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
// import { LeftArrow, RightArrow } from "./arrow";
import { Cards } from "./card";

// import "./globalStyles.css";

// NOTE: embrace power of CSS flexbox!
// import "./arrowsOnBottomOrTop.css";
// import "./hideScrollbar.css";
// import "./firstItemMargin.css";

// type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

const elemPrefix = "test";
const getId = (index: number) => `${elemPrefix}${index}`;

const getItems = () =>
    Array(15)
        .fill(0)
        .map((_, ind) => ({ id: getId(ind) }));

function Scroller() {
    const [items, setItems] = React.useState(getItems);

    // NOTE: hack for right arrow don't blink
    const newItemsLimit = 24;
    // NOTE: next part in arrows.tsx file

    // NOTE: for add items
    const pushNewItems = () => {
        if (items.length > newItemsLimit) {
            return false;
        }
        const newItems = items.concat(
            Array(5)
                .fill(0)
                .map((_, ind) => ({ id: getId(items.length + ind) }))
        );
        console.log("push new items");
        setItems(newItems);
    };

    return (
        <>
            <div className="example" style={{ paddingTop: "100px" }}>
                <div>
                    {/*<ScrollMenu*/}
                    {/*    LeftArrow={LeftArrow}*/}
                    {/*    RightArrow={*/}
                    {/*        <RightArrow limit={newItemsLimit} pushNewItems={pushNewItems} />*/}
                    {/*    }*/}
                    {/*    onWheel={onWheel}*/}
                    {/*>*/}
                    {/*    {items.map(({ id }) => (*/}
                    {/*        <Cards*/}

                    {/*            key={id}*/}
                    {/*        />*/}
                    {/*    ))}*/}
                    {/*</ScrollMenu>*/}
                </div>

            </div>
        </>
    );
}
export default Scroller;

// function onWheel(apiObj: scrollVisibilityApiType, ev: React.WheelEvent): void {
//     const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;
//
//     if (isThouchpad) {
//         ev.stopPropagation();
//         return;
//     }
//
//     if (ev.deltaY < 0) {
//         apiObj.scrollNext();
//     } else if (ev.deltaY > 0) {
//         apiObj.scrollPrev();
//     }
// }


