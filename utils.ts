import type { Question, SearchWord, Word, ToutiaoWord } from "./types.ts";

/** 合并两次热门话题并根据 id 去重 */
export function mergeQuestions(
  words: Question[],
  another: Question[],
): Question[] {
  const obj: Record<string, string> = {};
  for (const w of words.concat(another)) {
    obj[w.url] = w.title;
  }
  return Object.entries(obj).map(([url, title]) => ({
    url,
    title,
  }));
}

/** 合并两次关键词并根据 display_query 去重 */
export function mergeWords(
  words: SearchWord[],
  another: SearchWord[],
): SearchWord[] {
  const obj: Record<string, string> = {};
  for (const w of words.concat(another)) {
    obj[w.display_query] = w.query;
  }
  return Object.entries(obj).map(([display_query, query]) => ({
    query,
    display_query,
  }));
}

/** 合并两次热门话题并根据 id 去重 */
export function mergeWords4Toutiao(
  words: ToutiaoWord[],
  another: ToutiaoWord[],
): ToutiaoWord[] {
  const obj: Record<string, string> = {};
  for (const w of words.concat(another)) {
    obj[w.url] = w.word;
  }
  return Object.entries(obj).map(([url, word]) => ({
    url,
    word,
  }));
}

/** 合并两次热门话题并根据 id 去重 */
export function mergeWords4Weibo(
  words: Word[],
  another: Word[],
): Word[] {
  const obj: Record<string, string> = {};
  for (const w of words.concat(another)) {
    obj[w.url] = w.title;
  }
  return Object.entries(obj).map(([url, title]) => ({
    url,
    title,
  }));
}

export async function createReadme4Video(words: Question[]): Promise<string> {
  const readme = await Deno.readTextFile("./README.md");
  return readme.replace(
    /<!-- BEGIN ZHIHUVIDEO -->[\W\w]*<!-- END ZHIHUVIDEO -->/,
    createVideoList(words),
  );
}

export async function createReadme4Question(
  words: Question[],
): Promise<string> {
  const readme = await Deno.readTextFile("./README.md");
  return readme.replace(
    /<!-- BEGIN ZHIHUQUESTIONS -->[\W\w]*<!-- END ZHIHUQUESTIONS -->/,
    createQuestionList(words),
  );
}

export async function createReadme4Search(
  words: SearchWord[],
): Promise<string> {
  const readme = await Deno.readTextFile("./README.md");
  return readme.replace(
    /<!-- BEGIN ZHIHUSEARCH -->[\W\w]*<!-- END ZHIHUSEARCH -->/,
    createSearchList(words),
  );
}

export async function createReadme4Weibo(words: Word[]): Promise<string> {
  const readme = await Deno.readTextFile("./README.md");
  return readme.replace(
    /<!-- BEGIN WEIBO -->[\W\w]*<!-- END WEIBO -->/,
    createWeiboList(words),
  );
}

export async function createReadme4Toutiao(
  words: ToutiaoWord[],
): Promise<string> {
  const readme = await Deno.readTextFile("./README.md");
  return readme.replace(
    /<!-- BEGIN TOUTIAO -->[\W\w]*<!-- END TOUTIAO -->/,
    createTuotiaoList(words),
  );
}

export function createVideoList(words: Question[]): string {
  return `<!-- BEGIN ZHIHUVIDEO -->
<!-- 最后更新时间 ${Date()} -->
${
    words.map((x) => `1. [${x.title}](${x.url})`)
      .join("\n")
  }
<!-- END ZHIHUVIDEO -->`;
}

export function createQuestionList(words: Question[]): string {
  return `<!-- BEGIN ZHIHUQUESTIONS -->
<!-- 最后更新时间 ${Date()} -->
${
    words.map((x) => `1. [${x.title}](${x.url})`)
      .join("\n")
  }
<!-- END ZHIHUQUESTIONS -->`;
}

export function createSearchList(words: SearchWord[]): string {
  return `<!-- BEGIN ZHIHUSEARCH -->
<!-- 最后更新时间 ${Date()} -->
${
    words.map((x) =>
      `1. [${x.display_query}](https://www.zhihu.com/search?q=${x.query})`
    ).join("\n")
  }
<!-- END ZHIHUSEARCH -->`;
}

export function createWeiboList(words: Word[]): string {
  return `<!-- BEGIN WEIBO -->
<!-- 最后更新时间 ${Date()} -->
${
    words.map((x) => `1. [${x.title}](https://s.weibo.com/${x.url})`)
      .join("\n")
  }
<!-- END WEIBO -->`;
}

export function createTuotiaoList(words: ToutiaoWord[]): string {
  return `<!-- BEGIN TOUTIAO -->
<!-- 最后更新时间 ${Date()} -->
${
    words.map((x) => `1. [${x.word}](${x.url})`)
      .join("\n")
  }
<!-- END TOUTIAO -->`;
}

export function createArchive4Question(
  words: Question[],
  date: string,
): string {
  return `# ${date}\n
共 ${words.length} 条\n
${createQuestionList(words)}
`;
}

export function createArchive4Video(words: Question[], date: string): string {
  return `# ${date}\n
共 ${words.length} 条\n
${createVideoList(words)}
`;
}

export function createArchive4Search(
  words: SearchWord[],
  date: string,
): string {
  return `# ${date}\n
共 ${words.length} 条\n
${createSearchList(words)}
`;
}

export function createArchive4Weibo(words: Word[], date: string): string {
  return `# ${date}\n
共 ${words.length} 条\n
${createWeiboList(words)}
`;
}

export function createArchive4Toutiao(
  words: ToutiaoWord[],
  date: string,
): string {
  return `# ${date}\n
共 ${words.length} 条\n
${createTuotiaoList(words)}
`;
}
