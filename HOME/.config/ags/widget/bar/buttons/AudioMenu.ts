import PanelButton from '../PanelButton';
import icons from 'lib/icons';

const audio = await Service.import('audio');

const MicrophoneIndicator = () =>
    Widget.Icon()
        .hook(audio, (self) => (self.visible = audio.recorders.length > 0 || audio.microphone.is_muted || false))
        .hook(audio.microphone, (self) => {
            const vol = audio.microphone.is_muted ? 0 : audio.microphone.volume;
            const { muted, low, medium, high } = icons.audio.mic;
            const cons = [
                [67, high],
                [34, medium],
                [1, low],
                [0, muted]
            ] as const;
            self.icon = cons.find(([n]) => n <= vol * 100)?.[1] || '';
        });

const AudioIndicator = () =>
    Widget.Icon().hook(audio.speaker, (self) => {
        const vol = audio.speaker.is_muted ? 0 : audio.speaker.volume;
        const { muted, low, medium, high, overamplified } = icons.audio.volume;
        const cons = [
            [101, overamplified],
            [67, high],
            [34, medium],
            [1, low],
            [0, muted]
        ] as const;
        self.icon = cons.find(([n]) => n <= vol * 100)?.[1] || '';
    });

export default () =>
    PanelButton({
        window: 'audio',
        on_clicked: () => App.toggleWindow('audio'),
        on_scroll_up: () => (audio.speaker.volume += 0.05),
        on_scroll_down: () => (audio.speaker.volume -= 0.05),
        child: Widget.Box([AudioIndicator(), MicrophoneIndicator()])
    });
