use axum::{response::IntoResponse, Json};
use serde_json::json;

pub async fn cookie(cookie: Option<String>) -> impl IntoResponse {
    Json(json!({ "cookie": cookie }))
}
