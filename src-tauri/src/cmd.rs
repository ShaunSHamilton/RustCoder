use std::fs::File;
use std::io::BufReader;
use std::io::prelude::*;
use serde::Deserialize;

#[derive(Deserialize)]
#[serde(tag = "cmd", rename_all = "camelCase")]
pub enum Cmd {
  // your custom commands
  // multiple arguments are allowed
  // note that rename_all = "camelCase": you need to use "myCustomCommand" on JS
  MyCustomCommand { argument: String },
}

pub fn read_file(&file_path: String) -> std::io::Result<()> {
    let file = File::open(file_path)?;
    let mut buf_reader = BufReader::new(file);
    let mut contents = String::new();
    buf_reader.read_to_string(&mut contents)?;
    Ok(())
}

pub fn write_file(&file_name: String, &contents: String) -> std::io::Result<()> {
    let mut file = File::create(file_name)?;
    file.write_all(contents)?;
    Ok(())
}