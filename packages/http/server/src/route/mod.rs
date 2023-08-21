use axum::{routing::any, Router};
mod request;
mod response;
mod timeout;

pub fn get_route() -> Router {
    Router::new()
        .route("/response", any(response::response))
        .route("/timeout/:duration", any(timeout::timeout))
        .fallback(any(request::request))
}
