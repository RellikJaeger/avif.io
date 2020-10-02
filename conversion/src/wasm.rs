#![cfg(feature = "build-wasm")]

use std::mem;

use js_sys;
use wasm_bindgen::prelude::*;

use crate::avif;
pub use crate::avif::ConversionOptions;
pub use crate::yuv::Subsampling;
use crate::yuv;

#[wasm_bindgen]
pub struct ConversionResult {
    pub data: *const u8,
    pub size: usize,
    pub error: *const u8,
    pub error_size: usize,
}

#[wasm_bindgen]
impl ConversionResult {
    fn from_data(v: Vec<u8>) -> ConversionResult {
        let data = v.as_ptr();
        let size = v.len();
        mem::forget(v);
        ConversionResult { data, size, error: 0 as *const u8, error_size: 0 }
    }

    fn from_error(message: String) -> ConversionResult {
        let error = message.as_ptr();
        let error_size = message.len();
        ConversionResult { data: 0 as *const u8, size: 0, error, error_size }
    }
}


#[wasm_bindgen]
pub fn convert_to_avif(
    input_data: &[u8],
    options: &ConversionOptions,
    on_progress: js_sys::Function,
) -> ConversionResult {
    unsafe { register_progress_hook(on_progress); }

    let result = avif::convert_to_avif(input_data, options);
    match result {
        Ok(data) => ConversionResult::from_data(data),
        Err(e) => ConversionResult::from_error(e.to_string()),
    }
}

/// A special function for WebP.
#[wasm_bindgen]
pub fn raw_rgba_to_avif(
    input_data: &[u8],
    options: &ConversionOptions,
    width: usize,
    height: usize,
    on_progress: js_sys::Function,
) -> ConversionResult {
    unsafe { register_progress_hook(on_progress); }

    let yuv = yuv::from_rgba8_raw(input_data, options.subsampling, width, height);
    let data = avif::encode_avif(&yuv, options, width, height);
    ConversionResult::from_data(data)
}

unsafe fn register_progress_hook(on_progress: js_sys::Function) {
    #[cfg(feature = "console_error_panic_hook")]
        console_error_panic_hook::set_once();

    rav1e::ON_PROGRESS = Some(
        Box::new(move |progress| {
            let this = JsValue::null();
            let progress = JsValue::from(progress);
            on_progress.call1(&this, &progress).unwrap();
        })
    );
}
