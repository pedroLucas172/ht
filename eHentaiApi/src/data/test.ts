import { searchEHentai } from ".";
import searchEHentaiGallery from "./gallery/galleryDetails";
import { Toplist } from "./topList";

(async () => {
  //   const indexResult = await searchEHentai(1, "");
  const indexResult = await Toplist.getAllTime(1);
  console.log(indexResult.page);
  console.log(indexResult.url);
  console.log(indexResult.posts[0])

  // for (const post of indexResult.posts) {
  //   const galerryResult = await searchEHentaiGallery(post.address);
  //   if (galerryResult["url"] != "error") {
  //     show(post, galerryResult);
  //   }
  // }

  // function show(post: any, galerryResult: object) {
  //   console.log("\n_______________________________________\n");
  //   console.log(galerryResult)
  // }
})();
