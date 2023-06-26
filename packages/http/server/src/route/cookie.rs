use axum::{
    http::{header, HeaderMap, HeaderValue},
    response::IntoResponse,
    Json,
};

#[derive(serde::Deserialize, Debug)]
pub struct Cookie {
    name: String,
    value: String,
}

pub async fn cookie(Json(cookies): Json<Vec<Cookie>>) -> impl IntoResponse {
    println!("cookies: {:?}", cookies);
    let mut headers = HeaderMap::new();
    for cookie in cookies {
        headers.append(
            header::SET_COOKIE,
            HeaderValue::from_str(&format!("{}={}", cookie.name, cookie.value)).unwrap(),
        );
    }
    headers
}
