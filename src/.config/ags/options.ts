import { opt, mkOptions } from 'lib/option';

const options = mkOptions(OPTIONS, {
    autotheme: opt(false),

    wallpaper: {
        resolution: opt<import('service/wallpaper').Resolution>(1920),
        market: opt<import('service/wallpaper').Market>('random')
    },

    theme: {
        dark: {
            primary: {
                bg: opt('#458588'),
                fg: opt('#1d2021')
            },
            error: {
                bg: opt('#FB4934'),
                fg: opt('#1d2021')
            },
            bg: opt('#1d2021'),
            fg: opt('#EBDBB2'),
            widget: opt('#EBDBB2'),
            border: opt('#458588')
        },
        light: {
            primary: {
                bg: opt('#83A598'),
                fg: opt('#EBDBB2')
            },
            error: {
                bg: opt('#CC241D'),
                fg: opt('#EBDBB2')
            },
            bg: opt('#EBDBB2'),
            fg: opt('#282828'),
            widget: opt('#282828'),
            border: opt('#458588')
        },

        blur: opt(0),
        scheme: opt<'dark' | 'light'>('dark'),
        widget: { opacity: opt(94) },
        border: {
            width: opt(3),
            opacity: opt(100)
        },

        shadows: opt(true),
        padding: opt(7),
        spacing: opt(12),
        radius: opt(11)
    },

    transition: opt(200),

    font: {
        size: opt(10),
        name: opt('JetBrainsMono Nerd Font')
    },

    bar: {
        flatButtons: opt(true),
        position: opt<'top' | 'bottom'>('top'),
        corners: opt(50),
        transparent: opt(false),
        layout: {
            start: opt<Array<import('widget/bar/Bar').BarWidget>>([
                'workspaces',
                // 'taskbar',
                'expander'
            ]),
            center: opt<Array<import('widget/bar/Bar').BarWidget>>([]),
            end: opt<Array<import('widget/bar/Bar').BarWidget>>([
                'expander',
                'systray',
                'system',
                'battery',
                'messages',
                'date'
            ])
        },

        date: {
            format: opt('%d %b %H:%M'),
            action: opt(() => App.toggleWindow('datemenu'))
        },
        battery: {
            bar: opt<'hidden' | 'regular' | 'whole'>('hidden'),
            charging: opt('#98971A'),
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
            ignore: opt(['KDE Connect Indicator', 'spotify-client'])
        },
        media: {
            monochrome: opt(true),
            preferred: opt('spotify'),
            direction: opt<'left' | 'right'>('right'),
            format: opt('{artists} - {title}'),
            length: opt(40)
        },
        powermenu: {
            monochrome: opt(false),
            action: opt(() => App.toggleWindow('powermenu'))
        }
    },

    overview: {
        scale: opt(9),
        workspaces: opt(7),
        monochromeIcon: opt(true)
    },

    powermenu: {
        sleep: opt('systemctl suspend'),
        reboot: opt('systemctl reboot'),
        logout: opt('hyprctl dispatch exit'),
        shutdown: opt('shutdown now'),
        layout: opt<'line' | 'box'>('line'),
        labels: opt(true)
    },

    quicksettings: {
        avatar: {
            image: opt(`/var/lib/AccountsService/icons/${Utils.USER}`),
            size: opt(70)
        },
        width: opt(380),
        position: opt<'left' | 'center' | 'right'>('right'),
        networkSettings: opt('gnome-control-center'),
        media: {
            monochromeIcon: opt(true),
            coverSize: opt(100)
        }
    },

    datemenu: {
        position: opt<'left' | 'center' | 'right'>('right'),
        weather: {
            interval: opt(60_000),
            unit: opt<'metric' | 'imperial' | 'standard'>('metric'),
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
        gaps: opt(1),
        inactiveBorder: opt('#282828'),
        gapsWhenOnly: opt(false)
    }
});

globalThis['options'] = options;
export default options;
