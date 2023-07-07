# pi-clock
Alarm Clock for a Raspberry Pi Kiosk


## pi setup

1. Install these packages:

        xorg
        chromium-browser
        vim
        node (v18)

2. Install bash_profile and xinitrc

    * Copy [bash_profile](device_files/bash_profile) to `~/.bash-profile`
    * Copy [xinitrc](device_files/xinitrc) to `~/.xinitrc`

3. Install systemd service file

    * Copy [pi-clock.service](device_files/pi-clock.service) to `/etc/systemd/system/pi-clock.service`
    * Reload systemd:

            sudo systemctl daemon-reload

    * Enable the service so it runs on boot:

            sudo systemctl enable pi-clock
