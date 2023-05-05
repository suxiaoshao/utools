use serde::{Deserialize, Serialize};
use wasm_bindgen::JsValue;

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct SettingConfig {
    #[serde(rename = "fontSize")]
    font_size: u8,
    color: Option<String>,
}

impl SettingConfig {
    /// # 获取默认设置
    pub fn get_default() -> Self {
        Self {
            font_size: 1,
            color: None,
        }
    }
    /// # 检查设置是否合法
    pub fn check_value(&mut self) {
        match self.font_size {
            1..=10 => {}
            _ => {
                self.font_size = 1;
            }
        };
    }
}
impl From<SettingConfig> for JsValue {
    fn from(setting: SettingConfig) -> Self {
        serde_wasm_bindgen::to_value(&setting).unwrap()
    }
}

#[cfg(test)]
mod test {
    use crate::store::setting::SettingConfig;

    #[test]
    fn auto_theme() {
        let default_string = r#"{"theme":{"light":{"name":"明亮","type":"light","background":null},"dark":{"name":"暗黑","type":"dark","background":null}},"fontSize":1}"#;
        let from_default_string: SettingConfig = serde_json::from_str(default_string).unwrap();
        assert_eq!(from_default_string.font_size, 1);
        let default_setting = SettingConfig::get_default();
        assert_eq!(
            default_string,
            serde_json::to_string(&default_setting).unwrap()
        );
    }
    #[test]
    fn s_theme() {
        let string = r#"{"theme":{"name":"暗黑","type":"dark","background":null},"fontSize":1}"#;
        let setting = SettingConfig {
            font_size: 1,
            color: None,
        };
        assert_eq!(string, serde_json::to_string(&setting).unwrap());
    }
    #[test]
    fn check_setting() {
        let mut setting = SettingConfig {
            font_size: 1,
            color: None,
        };
        println!("{:?}", serde_json::to_string(&setting).unwrap());
        setting.check_value();
        assert_eq!(setting.font_size, 1);
        setting.font_size = 5;
        setting.check_value();
        assert_eq!(setting.font_size, 5);
        setting.font_size = 0;
        setting.check_value();
        assert_eq!(setting.font_size, 1);
        setting.font_size = 11;
        setting.check_value();
        assert_eq!(setting.font_size, 1);
    }
}
