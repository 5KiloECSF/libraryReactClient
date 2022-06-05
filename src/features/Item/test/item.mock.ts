
import {ItemModel, BorrowingHistory, Donations,} from "../itemModel";


export const history1:BorrowingHistory={
    bookId: "", bookName: "", isActive: false,
    endDate: "jan-31-2020", startDate: "jan-31-2020", userId: "1"
}

export const history2:BorrowingHistory={
    bookId: "", bookName: "", isActive: false,
    endDate: "jan-31-2020", startDate: "jan-31-2020", userId: "1"
}

export const donation1: Donations={
    userID:"1",
    userName:"abebe",
    amount:2
}

export const itemData1:ItemModel={

    id:"1234",
    name: "principles and power of vision ",
    image: {imageCover:"default.jpg",
        images: ["default.jpg", "default1.jpg"],
    },

    pageNo: 200,

    genres: ["self-help", "leadership"],

    booksAmount: 2,
    authors:["myles-monroe"],

    description: "about vision and its principles",
    borrowingHistory: [history1, history2],
    // currentHolder: "32",
    donors: [donation1,],

    language: "english",
    publishedDate: "jan 31-2020",
    ratingAverage: 0,
    ratingQuantity: 0,
    summary: "",
    tags: ["vision", "myles"]

}

export const itemData2:ItemModel={

    id:"",
    name: "good morning holy spirit ",
    image: {imageCover:"default.jpg",
        images: ["default.jpg", "default1.jpg"],},

    pageNo: 200,

    genres: ["self-help", "leadership", ""],

    booksAmount: 2,
    authors:["Benny Hinn"],

    description: "about vision and its principles",
    borrowingHistory: [history1, history2],
    // currentHolder: "32",
    donors: [donation1],

    language: "english",
    publishedDate: "jan 31-2020",
    ratingAverage: 0,
    ratingQuantity: 0,
    summary: "",
    tags: ["vision", "benny"]

}
