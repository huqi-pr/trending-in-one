import { zhihuVideo } from "./zhihu-video.ts";
import { zhihuQuestions } from "./zhihu-questions.ts";
import { zhihuSearch } from "./zhihu-search.ts";
import { weiboSearch } from "./weibo-search.ts";
import { toutiaoSearch } from "./toutiao-search.ts";

export async function init() {
  await zhihuVideo();
  await zhihuQuestions();
  await zhihuSearch();
  await weiboSearch();
  await toutiaoSearch();
}

init();
