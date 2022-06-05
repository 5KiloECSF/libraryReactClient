// export const API_ROOT = 'http://localhost:9000/api/v1/';
export const API_ROOT = 'https://library5k.herokuapp.com/api/v1/';

export const ItemsAdminLimit=10
export const ItemsListPageLimit=20
export const ItemsLatestLimit=7


export const NetworkImagePath = 'http://localhost:4000/img/movie/'
const url = window.location.host;
export const LocalImagePath = `http://${url}/images/`

export const LocalImage = (path, image)=>{
    return process.env.PUBLIC_URL+ path+ image
}
export const LocalImg=(img)=>{
    return LocalImagePath+img
}
export const NetworkImage=(path, image)=>{
    const pat= path||""
    return NetworkImagePath+ pat+ image
}
export const FirebaseImage=(image, imgs)=>{
    // const pat= path||""
    console.log("fbImage",image)
    return `${image.imagePath}${imgs}${image.suffix}`
}

export const USER_TOKEN="USER_TOKEN"

export const LOG_g = (name, value) => ({
    type: `LOGGING-->>${name}`,
    name,
    value
});
export const PUBLIC_FOLDER = 'http://localhost:3000/assets/';