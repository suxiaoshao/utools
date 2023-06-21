use axum::{routing::any, Router};
mod cookie;
mod request;
mod timeout;

pub fn get_route() -> Router {
    Router::new()
        .route("/cookie", any(cookie::cookie))
        .route("/timeout/:duration", any(timeout::timeout))
        .fallback(any(request::request))
}
