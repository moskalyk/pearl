use marine_rs_sdk::marine;

use marine_rs_sdk::WasmLoggerBuilder;
use marine_rs_sdk::MountedBinaryResult;

pub fn main() {
    WasmLoggerBuilder::new().build().unwrap();
}

#[marine]
pub fn download(url: String) -> String {
    log::info!("download called with url {}", url);

    let result = unsafe { curl(vec![url]) };
    String::from_utf8(result.stdout).unwrap()
}

#[marine]
#[link(wasm_import_module = "host")]
extern "C" {
    fn curl(cmd: Vec<String>) -> MountedBinaryResult;
}