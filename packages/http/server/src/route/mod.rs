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
    Router::new()
        .route("/cookie", any(cookie))
        .fallback(any(request))
}

async fn cookie(cookie: Option<String>) -> impl IntoResponse {
    Json(json!({ "cookie": cookie }))
}

async fn request(method: Method, headers: HeaderMap, url: OriginalUri) -> impl IntoResponse {
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
