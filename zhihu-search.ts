#!/usr/bin/env -S deno run --unstable --allow-net --allow-read --allow-write --import-map=import_map.json
// Copyright 2020 justjavac(迷渡). All rights reserved. MIT license.
import { format } from "std/datetime/mod.ts";
import { join } from "std/path/mod.ts";
import { exists } from "std/fs/mod.ts";

import type { SearchWord, TopSearch } from "./types.ts";
import {
  createArchive4Search,
  createReadme4Search,
  mergeWords,
} from "./utils.ts";

const response = await fetch("https://www.zhihu.com/api/v4/search/top_search");

if (!response.ok) {
  console.error(response.statusText);
  Deno.exit(-1);
}

const result: TopSearch = await response.json();
const words = result.top_search.words;

const yyyyMMdd = format(new Date(), "yyyy-MM-dd");
const fullPath = join("raw/zhihu-search", `${yyyyMMdd}.json`);

let wordsAlreadyDownload: SearchWord[] = [];
if (await exists(fullPath)) {
  const content = await Deno.readTextFile(fullPath);
  wordsAlreadyDownload = JSON.parse(content);
}

const wordsAll = mergeWords(words, wordsAlreadyDownload);

export const zhihuSearchData = wordsAll.map((x) => {
  x.url = `https://www.zhihu.com/search?q=${x.query}`;
  return x;
});

export async function zhihuSearch() {
  // 保存原始数据
  await Deno.writeTextFile(fullPath, JSON.stringify(wordsAll));

  // 更新 README.md
  const readme = await createReadme4Search(wordsAll);
  await Deno.writeTextFile("./README.md", readme);

  // 更新 archives
  const archiveText = createArchive4Search(wordsAll, yyyyMMdd);
  const archivePath = join("archives/zhihu-search", `${yyyyMMdd}.md`);
  await Deno.writeTextFile(archivePath, archiveText);
}
