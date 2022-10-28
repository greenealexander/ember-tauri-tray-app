#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use tauri::{Manager, PhysicalPosition, Position, SystemTray, SystemTrayEvent};

fn main() {
    let system_tray = SystemTray::new();
    tauri::Builder::default()
        .system_tray(system_tray)
        .on_system_tray_event(|app, event| match event {
            SystemTrayEvent::LeftClick { position, .. } => {
                let window = app.get_window("main").unwrap();
                if window.is_visible().unwrap() {
                    window.hide().unwrap();
                } else {
                    window
                        .set_position(Position::Physical(PhysicalPosition {
                            x: (position.x - (window.inner_size().unwrap().width / 2) as f64)
                                as i32,
                            y: position.y as i32,
                        }))
                        .unwrap();
                    window.show().unwrap();
                    window.set_focus().unwrap();
                }
            }
            SystemTrayEvent::RightClick {
                position: _,
                size: _,
                ..
            } => {
                println!("system tray received a right click");
            }
            // SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
            //     "quit" => {
            //         std::process::exit(0);
            //     }
            //     "hide" => {
            //         let window = app.get_window("main").unwrap();
            //         window.hide().unwrap();
            //     }
            //     _ => {}
            // },
            _ => {}
        })
        .build(tauri::generate_context!())
        .expect("error while building tauri application")
        .run(|app_handle, event| match event {
            tauri::RunEvent::ExitRequested { api, .. } => {
                api.prevent_exit();
            }
            tauri::RunEvent::Ready => {
                let window = app_handle.get_window("main").unwrap();
                window.hide().unwrap();
            }
            _ => {}
        })
}
