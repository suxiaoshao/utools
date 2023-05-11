use std::net::SocketAddr;

use crate::route::get_route;
mod route;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    // build our application with a route
    let app = get_route();

    // run it
    let addr = SocketAddr::from(([127, 0, 0, 1], 3000));
    println!("listening on {}", addr);
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await?;
    Ok(())
}
