import { opt, mkOptions } from 'lib/option';
import { distro } from 'lib/variables';
import { icon } from 'lib/utils';
import icons from 'lib/icons';

const options = mkOptions(OPTIONS, {
    autotheme: opt(false),


    theme: {
        dark: {
            primary: {
                bg: opt('#458588'),
                fg: opt('#282828')
            },
            error: {
                bg: opt('#CC241D'),
                fg: opt('#282828')
            },
            bg: opt('#1d2021'),
            fg: opt('#EBDBB2'),
            widget: opt('#EBDBB2'),
            border: opt('#EBDBB2')
        },
        light: {
            primary: {
                bg: opt('#426ede'),
                fg: opt('#eeeeee')
            },
            error: {
                bg: opt('#b13558'),
                fg: opt('#eeeeee')
            },
            bg: opt('#fffffa'),
            fg: opt('#080808'),
            widget: opt('#080808'),
            border: opt('#080808')
        },

        blur: opt(0),
        scheme: opt<'dark' | 'light'>('dark'),
        widget: { opacity: opt(94) },
        border: {
            width: opt(1),
            opacity: opt(100)
        },

        shadows: opt(false),
        padding: opt(3),
        spacing: opt(6),
        radius: opt(2)
    },

    transition: opt(200),

    font: {
        size: opt(9),
        name: opt('JetBrainsMono Nerd Font')
    },

    bar: {
        flatButtons: opt(true),
        position: opt<'top' | 'bottom'>('top'),
        corners: opt(50),
        transparent: opt(false),
        layout: {
            start: opt<Array<import('widget/bar/Bar').BarWidget>>(['workspaces', 'expander']),
            center: opt<Array<import('widget/bar/Bar').BarWidget>>([]),
            end: opt<Array<import('widget/bar/Bar').BarWidget>>([
                'expander',
                'screenrecord',
                // 'media',
                'systray',
                'system',
                'battery',
                'messages',
                'date'
            ])
        },
        launcher: {
            icon: {
                colored: opt(true),
                icon: opt(icon(distro.logo, icons.ui.search))
            },
            label: {
                colored: opt(true),
                label: opt(' Applications')
            },
            action: opt(() => App.toggleWindow('launcher'))
        },
        date: {
            format: opt('%d %b %H:%M'),
            action: opt(() => App.toggleWindow('datemenu'))
        },
        battery: {
            bar: opt<'hidden' | 'regular' | 'whole'>('regular'),
            charging: opt('#00D787'),
            percentage: opt(true),
            blocks: opt(7),
            width: opt(50),
            low: opt(30)
        },
        workspaces: {
            workspaces: opt(0)
        },
        taskbar: {
            iconSize: opt(0),
            monochrome: opt(true),
            exclusive: opt(false)
        },
        messages: {
            action: opt(() => App.toggleWindow('datemenu'))
        },
        systray: {
            ignore: opt([])
        },
        media: {
            monochrome: opt(true),
            preferred: opt('spotify'),
            direction: opt<'left' | 'right'>('right'),
            format: opt('{title}'),
            length: opt(40)
        },
        powermenu: {
            monochrome: opt(false),
            action: opt(() => App.toggleWindow('powermenu'))
        }
    },

    overview: {
        scale: opt(12),
        workspaces: opt(0),
        monochromeIcon: opt(false)
    },

    powermenu: {
        sleep: opt('systemctl suspend'),
        reboot: opt('systemctl reboot'),
        logout: opt('hyprctl dispatch logout'),
        shutdown: opt('shutdown now'),
        layout: opt<'line' | 'box'>('line'),
        labels: opt(true)
    },

    idle: {
        turn_on: opt('hypridle &'),
        turn_off: opt('killall hypridle'),
        default: opt('hypridle &')
    },

    quicksettings: {
        avatar: {
            image: opt(`/var/lib/AccountsService/icons/${Utils.USER}`),
            size: opt(40)
        },
        width: opt(380),
        position: opt<'left' | 'center' | 'right'>('right'),
        networkSettings: opt('gtk-launch gnome-control-center'),
        media: {
            monochromeIcon: opt(false),
            coverSize: opt(60)
        }
    },

    datemenu: {
        position: opt<'left' | 'center' | 'right'>('right'),
        weather: {
            interval: opt(60_000),
            unit: opt<'metric' | 'imperial' | 'standard'>('standard'),
            key: opt<string>(JSON.parse(Utils.readFile(`${App.configDir}/.weather`) || '{}')?.key || ''),
            cities: opt<Array<number>>(JSON.parse(Utils.readFile(`${App.configDir}/.weather`) || '{}')?.cities || [])
        }
    },

    osd: {
        progress: {
            vertical: opt(true),
            pack: {
                h: opt<'start' | 'center' | 'end'>('end'),
                v: opt<'start' | 'center' | 'end'>('center')
            }
        },
        microphone: {
            pack: {
                h: opt<'start' | 'center' | 'end'>('center'),
                v: opt<'start' | 'center' | 'end'>('end')
            }
        }
    },

    notifications: {
        position: opt<Array<'top' | 'bottom' | 'left' | 'right'>>(['top', 'right']),
        blacklist: opt(['Spotify']),
        width: opt(440)
    },

    hyprland: {
        gaps: opt(0.5),
        inactiveBorder: opt('#282828'),
        gapsWhenOnly: opt(false)
    }
});

globalThis['options'] = options;
export default options;
