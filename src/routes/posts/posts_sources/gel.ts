import createGenericHandler from './generic/genericBooruQuery';

const gelbooruUrl = 'https://gelbooru.com/index.php?page=dapi&s=post&q=index';
const gelbooruRoute = createGenericHandler(gelbooruUrl, 'Gelbooru');

export default gelbooruRoute;