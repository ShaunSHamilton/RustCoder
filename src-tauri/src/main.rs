#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

mod cmd;

use serde::Serialize;

#[derive(Serialize)]
struct Reply {
  data: String,
}

fn main() {
  tauri::AppBuilder::new()
    .setup(|_webviews, _source| {
    // use cmd::Cmd::*;
      // const webviews = webview.copy();
      // let mut webview = webviews.as_mut();
      // tauri::event::listen(String::from("codeSubmit"), move |msg| {
      //   println!("got js-event with message '{:?}'", msg);
      //   let reply = Reply {
      //     data: "// Running tests...\n// Test results".to_string(),
      //   };

      //   tauri::event::emit(&mut webview, String::from("rust-event"), Some(reply))
      //     .expect("failed to emit");
      // });
    })
    .build()
    .run();
}
