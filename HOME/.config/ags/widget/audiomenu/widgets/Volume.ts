import { type Stream } from 'types/service/audio';
import icons from 'lib/icons.js';
import { Arrow, Menu, SimpleMenu } from '../ToggleButton';
import { dependencies, icon, sh } from 'lib/utils';
import options from 'options';

const { media } = options.bar;

const audio = await Service.import('audio');

type Type = 'microphone' | 'speaker';

const VolumeIndicator = (type: Type = 'speaker') =>
    Widget.Button({
        vpack: 'center',
        on_clicked: () => (audio[type].is_muted = !audio[type].is_muted),
        child: Widget.Icon({
            icon: audio[type].bind('icon_name').as((i) => icon(i || '', icons.audio.mic.high)),
            tooltipText: audio[type].bind('volume').as((vol) => `Volume: ${Math.floor(vol * 100)}%`)
        })
    });

const MicIndicator = () =>
    Widget.Button({
        vpack: 'center',
        on_clicked: () => (audio.microphone.is_muted = !audio.microphone.is_muted),
        child: Widget.Icon({
            icon: audio.microphone.bind('icon_name').as(() => icon(icons.audio.mic.high)),
            tooltipText: audio.microphone.bind('volume').as((vol) => `Volume: ${Math.floor(vol * 100)}%`)
        })
    });

const VolumeSlider = (type: Type = 'speaker') =>
    Widget.Slider({
        hexpand: true,
        draw_value: false,
        on_change: ({ value, dragging }) => {
            if (dragging) {
                audio[type].volume = value;
                audio[type].is_muted = false;
            }
        },
        value: audio[type].bind('volume'),
        class_name: audio[type].bind('is_muted').as((m) => (m ? 'muted' : ''))
    });

export const Volume = () =>
    Widget.Box({
        class_name: 'volume',
        children: [
            VolumeIndicator('speaker'),
            VolumeSlider('speaker'),
            Widget.Box({
                vpack: 'center',
                child: Arrow('sink-selector')
            })
        ]
    });

export const Microphone = () =>
    Widget.Box({
        class_name: 'slider horizontal',
        visible: audio.bind('recorders').as((a) => a.length > 0),
        children: [MicIndicator(), VolumeSlider('microphone')]
    });

const MixerItem = (stream: Stream) =>
    Widget.Box(
        { hexpand: true, class_name: 'mixer-item horizontal' },
        Widget.Icon({
            tooltip_text: stream.bind('name').as((n) => n || ''),
            icon: stream.bind('name').as((n) => {
                return Utils.lookUpIcon(n?.toLocaleLowerCase() || '')
                    ? n?.toLocaleLowerCase() || ''
                    : icons.fallback.audio;
            })
        }),

        Widget.Box(
            { vertical: true },
            Widget.Slider({
                hexpand: true,
                draw_value: false,
                value: stream.bind('volume'),
                on_change: ({ value }) => (stream.volume = value)
            })
        )
    );

const SinkItem = (stream: Stream) =>
    Widget.Button({
        hexpand: true,
        on_clicked: () => (audio.speaker = stream),
        child: Widget.Box({
            children: [
                Widget.Icon({
                    icon: icon(stream.icon_name || '', icons.fallback.audio),
                    tooltip_text: stream.icon_name || ''
                }),
                Widget.Label((stream.description || '').split(' ').slice(0, 4).join(' ')),
                Widget.Icon({
                    icon: icons.ui.tick,
                    hexpand: true,
                    hpack: 'end',
                    visible: audio.speaker.bind('stream').as((s) => s === stream.stream)
                })
            ]
        })
    });

const SettingsButton = () =>
    Widget.Button({
        on_clicked: () => {
            if (dependencies('pavucontrol')) sh('pavucontrol');
        },
        hexpand: true,
        child: Widget.Box({
            children: [Widget.Icon(icons.ui.settings), Widget.Label('Settings')]
        })
    });

export const AppMixer = () =>
    Widget.Box({
        vertical: true,
        visible: audio.bind('apps').as((apps) => apps.length > 0),
        class_name: 'app-mixer',
        children: audio.bind('apps').as((a) => a.map(MixerItem))
    });

export const SinkSelector = () =>
    Menu({
        name: 'sink-selector',
        icon: icons.audio.type.headset,
        title: 'Sink Selector',
        content: [
            Widget.Box({
                vertical: true,
                children: audio.bind('speakers').as((a) => a.map(SinkItem))
            }),
            SettingsButton()
        ]
    });
