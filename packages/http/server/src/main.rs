/*
 * @Author: suxiaoshao suxiaoshao@gmail.com
 * @Date: 2023-12-31 16:03:02
 * @LastEditors: suxiaoshao suxiaoshao@gmail.com
 * @LastEditTime: 2023-12-31 16:31:49
 * @FilePath: /utools/packages/http/server/src/main.rs
 */
use std::net::SocketAddr;

use tokio::net::TcpListener;

use crate::route::get_route;
mod route;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    // build our application with a route
    let app = get_route();

    // run it
    let addr = SocketAddr::from(([127, 0, 0, 1], 3000));
    let listener = TcpListener::bind(addr).await?;
    println!("listening on {}", addr);
    axum::serve(listener, app).await?;
    Ok(())
}
