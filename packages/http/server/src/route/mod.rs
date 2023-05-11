use std::collections::HashMap;

use axum::{
    extract::OriginalUri,
    http::{HeaderMap, Method},
    response::IntoResponse,
    routing::any,
    Json, Router,
};
use serde_json::json;

pub fn get_route() -> Router {
    Router::new().fallback(any(handler))
}

async fn handler(method: Method, headers: HeaderMap, url: OriginalUri) -> impl IntoResponse {
    let headers = headers
        .iter()
        .map(|(k, v)| (k.as_str(), v.to_str().unwrap()))
        .collect::<HashMap<_, _>>();
    Json(json!({
        "method": method.as_str(),
        "headers": headers,
        "path": url.path(),
    }))
}
