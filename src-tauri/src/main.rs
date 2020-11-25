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
      use tauri::event::{listen, emit};
      use tauri_api::dialog::{pick_folder, document_dir}
      use cmd::Cmd::*;
      const webviews = webview.copy();
      let mut webview = webviews.as_mut();
      let mut file_name;

      let mut lesson_folder_path;

      // When user initialises the app, a dialog opens - asking where the user has
      // stored the 'lesson_files'
      listen(String::from("initialiseEnv"), move |msg| {
        println!("Initialising Environment...");
        let default_path = document_dir();
        lesson_folder_path: Result<Response> = pick_folder(default_path);
      })

      listen(String::from("setFile"), move |msg| {
        println!("Setting file...");
        file_name = msg.copy();
      })

      listen(String::from("codeSubmit"), move |msg| {
        println!("JS-event with message '{:?}'", msg);
        let reply = Reply {
          data: "Saved code to file...".to_string(),
        };

        write_file(file_name, &msg)

        emit(&mut webview, String::from("rust-success"), Some(reply))
          .expect("failed to emit");
      });
      listen(String::from("codeRead"), move |msg| {
        println!("got js-event with message '{:?}'", msg);
        let reply = Reply {
          data: "// Running tests...\n// Test results".to_string(),
        };

        emit(&mut webview, String::from("rust-event"), Some(reply))
          .expect("failed to emit");
      });
    })
    .build()
    .run();
}
