use std::collections::HashMap;

use axum::{
    extract::OriginalUri,
    http::{HeaderMap, Method},
    response::IntoResponse,
    Json,
};
use serde_json::json;

pub async fn request(method: Method, headers: HeaderMap, url: OriginalUri) -> impl IntoResponse {
    let headers = headers
        .iter()
        .map(|(k, v)| (k.as_str(), v.to_str().unwrap()))
        .collect::<HashMap<_, _>>();
    Json(json!({
        "method": method.as_str(),
        "headers": headers,
        "path": url.path(),
        "query": url.query(),
        "original-url": url.to_string()
    }))
}
