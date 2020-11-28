#!/usr/bin/env -S deno run --unstable --allow-net --allow-read --allow-write --import-map=import_map.json
// Copyright 2020 justjavac(迷渡). All rights reserved. MIT license.
import { format } from "std/datetime/mod.ts";
import { join } from "std/path/mod.ts";
import { exists } from "std/fs/mod.ts";

import type { ToutiaoTopSearch, ToutiaoWord } from "./types.ts";
import { createArchive4Toutiao, createReadme4Toutiao, mergeWords4Toutiao } from "./utils.ts";

const response = await fetch("https://is-lq.snssdk.com/api/suggest_words/?business_id=10016");

if (!response.ok) {
  console.error(response.statusText);
  Deno.exit(-1);
}

const result: ToutiaoTopSearch = await response.json();
const words = result.data[0].words;

const yyyyMMdd = format(new Date(), "yyyy-MM-dd");
const fullPath = join("raw/toutiao-search", `${yyyyMMdd}.json`);

let wordsAlreadyDownload: ToutiaoWord[] = [];
if (await exists(fullPath)) {
  const content = await Deno.readTextFile(fullPath);
  wordsAlreadyDownload = JSON.parse(content);
}


const wordsAll = mergeWords4Toutiao(words, wordsAlreadyDownload);

export const ToutiaoSearchData = wordsAll.map(x=> {
  x.url = `https://so.toutiao.com/search?keyword=${x.word.replace(' ','+')}`;
  return x;
});

export async function toutiaoSearch() {
  // 保存原始数据
  await Deno.writeTextFile(fullPath, JSON.stringify(wordsAll));

  // 更新 README.md
  const readme = await createReadme4Toutiao(wordsAll);
  await Deno.writeTextFile("./README.md", readme);

  // 更新 archives
  const archiveText = createArchive4Toutiao(wordsAll, yyyyMMdd);
  const archivePath = join("archives/toutiao-search", `${yyyyMMdd}.md`);
  await Deno.writeTextFile(archivePath, archiveText);

}
