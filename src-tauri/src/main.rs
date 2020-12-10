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
  // use tauri_api::command::spawn_relative_command;
  // use std::process::Stdio;
  server_command();

  // Development
  // let res = spawn_relative_command(String::from("node"), vec!("--".to_string()), Stdio::piped());
  
  // // Production
  // // let res = spawn_relative_command(String::from("node ./server-dist/bundle_server.js"), vec!(), Stdio::piped());
  // let conf = match res {
  //   Ok(t) => t,
  //   Err(e) => {
  //     println!("{}", e);
  //     panic!("Could not get config from tauri...")
  //   }
  // };

  // let output = conf.wait_with_output().expect("Failed to read stdout");
  // println!("{}",String::from_utf8_lossy(&output.stdout));
  // println!("res: {:?}",conf);

  tauri::AppBuilder::new()
    .setup(|_webview, _source| {
      use tauri::event::{listen, emit};
      // use tauri_api::dialog::{pick_folder};
      // use tauri_api::path::{resource_dir};
      // use tauri_api::dir::{read_dir};
      // use tauri_api::config::{get,Config,TauriConfig, EmbeddedServerConfig};
      // use tauri_api::command::spawn_relative_command;
      // use std::process::Stdio;
      // use nfd::Response::{Okay, OkayMultiple, Cancel};
      use cmd::{write_file,read_file};
      // const webviews: &mut Webview = webview.copy();
      let mut webview = _webview.as_mut();
      let mut file_name = String::new();

      let mut lesson_folder_path = String::from("./");

      // Development
      // let res = spawn_relative_command(String::from("node ../../server-dist/bundle_server.js"), vec!(), Stdio::piped());
      
      // // Production
      // // let res = spawn_relative_command(String::from("node ./server-dist/bundle_server.js"), vec!(), Stdio::piped());
      // let conf = match res {
      //   Ok(t) => t,
      //   Err(_) => panic!("Could not get config from tauri...")
      // };

      // let output = conf.wait_with_output().expect("Failed to read stdout");
      // println!("{}",String::from_utf8_lossy(&output.stdout));
      // println!("res: {:?}",conf);

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
        let _reply = Reply {
          data: "Saved code to file...".to_string(),
        };

        // write_file(file_name, msg);
        write_file(String::from("../lesson_files/src/main.rs"), msg.unwrap()).expect("Failed to write to main file...");

        // emit(&mut webview, String::from("rust-success"), Some(reply))
        //   .expect("failed to emit");
      });
      
      listen(String::from("submitCode"), move |msg| {
        println!("got js-event with message '{:?}'", msg);
        let _reply = Reply {
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


fn server_command() {
  use std::process::Command;
  use tauri_utils::platform::resource_dir;
  Command::new(
    "node".to_string()
  ).current_dir(resource_dir().expect("failed here...")).arg("./server-dist/bundle_server.js".to_string())
  .spawn().expect("Failed here...");
}