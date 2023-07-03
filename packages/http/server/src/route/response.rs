use axum::{
    http::{HeaderMap, HeaderName, HeaderValue, StatusCode},
    response::IntoResponse,
    Json,
};
use base64::{engine::general_purpose, Engine as _};

#[derive(serde::Deserialize, Debug)]
pub struct Header {
    key: String,
    value: String,
}

#[derive(serde::Deserialize, Debug, serde::Serialize)]
#[serde(tag = "tag", content = "data")]
pub enum PureBody {
    None,
    Text(String),
    Binary(String),
}

#[derive(serde::Deserialize, Debug)]
pub struct Response {
    status: u16,
    headers: Vec<Header>,
    body: PureBody,
}

pub async fn response(
    Json(Response {
        status,
        headers,
        body,
    }): Json<Response>,
) -> impl IntoResponse {
    let mut h = HeaderMap::new();
    for Header { key, value } in headers {
        h.insert(
            key.parse::<HeaderName>().unwrap(),
            HeaderValue::from_str(&value).unwrap(),
        );
    }
    let body: Vec<u8> = match body {
        PureBody::None => vec![],
        PureBody::Text(text) => text.into(),
        PureBody::Binary(binary) => general_purpose::STANDARD_NO_PAD.decode(binary).unwrap(),
    };
    (StatusCode::from_u16(status).unwrap_or_default(), h, body)
}

#[cfg(test)]
mod test {
    use super::PureBody;

    #[test]
    fn body() {
        let body = PureBody::Binary("SGVsbG8gV29ybGQh".to_string());
        println!("{}", serde_json::to_string(&body).unwrap());
        let body = PureBody::Text("Hello World!".to_string());
        println!("{}", serde_json::to_string(&body).unwrap());
        let body = PureBody::None;
        println!("{}", serde_json::to_string(&body).unwrap());
    }
}
