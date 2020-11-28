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
    .setup(|_webview, _source| {
      use tauri::event::{listen, emit};
      use tauri_api::dialog::{pick_folder};
      use tauri_api::path::{resource_dir};
      use tauri_api::dir::{read_dir};
      use nfd::Response::{Okay, OkayMultiple, Cancel};
      use cmd::{write_file,read_file};
      // const webviews: &mut Webview = webview.copy();
      let mut webview = _webview.as_mut();
      let mut file_name = String::new();

      let mut lesson_folder_path = String::from("./");


      // When user initialises the app, a dialog opens - asking where the user has
      // stored the 'lesson_files'
      listen(String::from("initialiseEnv"), move |msg| {
        println!("Initialising Environment...");

        lesson_folder_path = msg.unwrap();
        // let src_folder: dyn AsRef<std::path::Path> = lesson_folder_path.clone().push_str::<>("/src").as_ref();
        // let src_folders: dyn AsRef<std::path::Path> = src_folder;
        // let files: Result<Vec::with_capacity(2: u8)> = read_dir(src_folders, false);
      
        println!("lesson_folder_path: {}",lesson_folder_path);
        emit(&mut webview, String::from("envInitialised"), Some("success".to_string()))
          .expect("Failed to emit");
      });

      // When user navigates to a new challenge, fetch the relevent file
      listen(String::from("setFile"), move |msg| {
        // println!("Setting file...{:?}", msg);
        file_name = msg.unwrap_or("Some".to_string());
      });

      // When user unfocusses from editor, write code to relevant file
      listen(String::from("updateCode"), move |msg| {
        println!("JS-event with message '{:?}'", msg);
        let reply = Reply {
          data: "Saved code to file...".to_string(),
        };

        // write_file(file_name, msg);
        write_file(String::from("../lesson_files/src/main.rs"), msg.unwrap()).expect("Failed to write to main file...");

        // emit(&mut webview, String::from("rust-success"), Some(reply))
        //   .expect("failed to emit");
      });
      
      listen(String::from("submitCode"), move |msg| {
        println!("got js-event with message '{:?}'", msg);
        let reply = Reply {
          data: "// Running tests...\n// Test results".to_string(),
        };

        write_file(String::from("../lesson_files/src/1-introduction.rs"), msg.unwrap()).expect("Failed to write to file...");

        // emit(&mut webview, String::from("rust-event"), Some(reply))
        //   .expect("failed to emit");
      });
    })
    .build()
    .run();
}
