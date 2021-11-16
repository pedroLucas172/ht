import createGenericHandler from './generic/genericBooruQuery';

const rule34Url = 'https://rule34.xxx/index.php?page=dapi&s=post&q=index';
const rule34Route = createGenericHandler(rule34Url, 'Rule34');
export default rule34Route;
