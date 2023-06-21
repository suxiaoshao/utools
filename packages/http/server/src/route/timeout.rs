use axum::{extract::Path, response::IntoResponse, Json};
use serde_json::json;

pub async fn timeout(Path(time): Path<u64>) -> impl IntoResponse {
    tokio::time::sleep(tokio::time::Duration::from_millis(time)).await;
    Json(json!({ "timeout": true }))
}
