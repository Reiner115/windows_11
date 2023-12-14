const images = require.context("../images/",true);


function getImage  ( fileName ){
    return images("./"+ fileName).default;
}

export default getImage;

