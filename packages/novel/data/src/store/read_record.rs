use std::cmp::Ordering;

use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;

/// # 阅读记录
#[wasm_bindgen]
#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct ReadRecord {
    pub(crate) author: String,
    pub(crate) name: String,
    pub(crate) chapter: Chapter,
    #[serde(rename = "mainPageUrl")]
    pub(crate) main_page_url: String,
    #[serde(rename = "novelId")]
    pub(crate) novel_id: String,
    pub(crate) image: Option<String>,
    pub(crate) desc: String,
}
#[wasm_bindgen]
impl ReadRecord {
    #[wasm_bindgen]
    pub fn match_url(&self, url: &str) -> bool {
        self.main_page_url == url
    }
    pub fn update(&mut self, other: Self) {
        self.name = other.name;
        self.author = other.author;
        self.chapter = other.chapter;
        self.image = other.image;
        self.desc = other.desc;
    }
}

impl PartialEq for ReadRecord {
    fn eq(&self, other: &Self) -> bool {
        self.novel_id == other.novel_id && self.main_page_url == other.main_page_url
    }
}
impl Eq for ReadRecord {}
impl PartialOrd for ReadRecord {
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
        match self.main_page_url.partial_cmp(&other.main_page_url)? {
            Ordering::Equal => self.novel_id.partial_cmp(&other.novel_id),
            other => Some(other),
        }
    }
}
impl Ord for ReadRecord {
    fn cmp(&self, other: &Self) -> Ordering {
        match self.main_page_url.cmp(&other.main_page_url) {
            Ordering::Equal => self.novel_id.cmp(&other.novel_id),
            other => other,
        }
    }
}
/// # 章节数据
#[wasm_bindgen]
#[derive(Serialize, Deserialize, Debug, Clone, Eq, PartialEq)]
pub struct Chapter {
    name: String,
    #[serde(rename = "chapterId")]
    chapter_id: String,
}
