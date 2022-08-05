
export interface ItemFilter{
    search?:string

    genres?:string
    language?: string
    type?:string
    tags?:string[]
    available?:boolean

    authors?:string
    donorsID?:string //for Admin-- books.donors.id in []

    //pagination related
    page:number
    lastPageReached:boolean
    limit?:number

    ctgId?:string
}
/*
    Creating Variables
    -------------------
    - name, description, images,
    - genres, tags :- Needs Genres & tags list
    - donors-- needs users List

    - language, page, amount,Type, published date,

    - authors

 */

export interface ItemModel{
    id: string
    name: string
    slug?:string

    genres?:string[]
    tags?:string[] //Tags of books could be: Leadership, grace, prayer, word, HolySpirit
    donors?: Donations[]


    language?: string //amh , eng, orom, tig
    type?:string // Spiritual, Secular --- This could Also a tag or Genre
    pageNo?:number

    authors?:string[]
    poster?:string
    image?: {
        images?: string[]
        imageCover?:string
        suffix?:string
        imagePath?:string
    }
    summary?:string
    description?:string

    publishedDate?:string

    // ================= library related infos ===
    booksAmount ?: number
    amountInStore?:number

    // currentHolders?: string // can be accomplished by is Active in borrowingHistory
    borrowingHistory?: BorrowingHistory[]

    queues?:Queues[]

    ratingAverage?: number
    ratingQuantity?:number
}

// In Books, To track Users who have donated it
/*
books.donors.userId == $id
 */
export interface Donations{
    userID?:string
    userName?:string
    amount?:number
}

//Users queueing this Book & books in queue by a user
//- user.id == book.queues.userId
//- book.queues.userId= $id
interface Queues{
    userID?:string
    userName?:string
    startedDate?:string
}



/* Borrowing History
this is list in the books model  || its own model
- every time a user borrows a book it will be added to the books array & will be

Queries
- get borrowing History for a book by id()
- get a users Borrowing History(),
- Get books That are actively borrowed
-
-
*/
export interface BorrowingHistory {
    isActive:boolean
    userId:string
    userFullName?:string

    bookId:string
    bookName:string
    bookImg?:string

    startDate:string //Created Date
    endDate?:string
    returnedDate?:string
}

export interface ItemState {
    filter:ItemFilter
    items: ItemModel[],
    item?: ItemModel ,
    latestItems?:ItemModel[],

    loadingStatus: string,
    uploadStatus?:string
    error: Error|null,
    queryType: string,
}

export interface ActionError{
    error:Error,
    queryType:string
}


