# pi-clock
Alarm Clock for a Raspberry Pi Kiosk

## TODO

* Global disableUntilDate
* Settings UI in admin panel
        - set snooze duration
        - upload/manage alarm sounds
* Fix weird bug with DST
        The clock does not update the displayed time when crossing a DST
        boundary (Alarms still go off at the right time)
* Migrate away from using camo, use nedb directly
        camo hasn't been updated in a while, and idiotically pulls in a lot
        of needless dependencies that aren't used, and have vulnerabilities.
        Fucking javascript devs, amirite?
* Improve module system, probably should be less os based and more player based.

## Features

* Web UI (at `/admin`) to configure alarms.
* Multiple alarms can be configured.
* Alarms may be be set to repeat on configurable weekdays.
* Alarms may be set to be skipped until a given date.
* Display turns off after 30s, wakes with touch (or when an alarm goes off).

## Requirements and setup

This was designed to run on a Raspberry Pi 3B+. It should be able to run on
other pi models, but adjustments to packages used may need to be made, and
compatibility is not guaranteed.

This expects a display to be available on `:0`, and an audio device connected
via the 1/8" audio out port on the pi.

1. Install these packages:

        xorg
        chromium-browser
        vlc-bin
        vlc-plugin-base

pi-clock uses VLC on the command line to play audio files.

2. Install Node

You can install it via a package manager, but I'd recommend a manual 
installation, from [NodeJS Downloads][1]. Check the [package.json][2] for what 
version of NodeJS to use.

3. Install bash_profile and xinitrc

    * Copy [bash_profile][3] to `~/.bash-profile`
    * Copy [xinitrc][4]= to `~/.xinitrc`

4. Install systemd service file

    * Copy [pi-clock.service][5] to `/etc/systemd/system/pi-clock.service`
    * Reload systemd:

            sudo systemctl daemon-reload

    * Enable the service so it runs on boot:

            sudo systemctl enable pi-clock

## Link References

[1]: https://nodejs.org/en/download "NodeJS Downloads"
[2]: package.json "package.json"
[3]: device_files/bash_profile ".bash_profile"
[4]: device_files/xinitrc ".xinitrc"
[5]: device_files/pi-clock.service "pi-clock.service"