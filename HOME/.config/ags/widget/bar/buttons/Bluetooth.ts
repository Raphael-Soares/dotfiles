import PanelButton from '../PanelButton';
import options from 'options';
import icons from 'lib/icons';

const { action } = options.bar.bluetooth;
const bluetooth = await Service.import('bluetooth');

export const BluetoothIndicator = () =>
    Widget.Overlay({
        class_name: 'bluetooth',
        passThrough: true,
        child: Widget.Icon().hook(bluetooth, (self) => {
            self.icon = bluetooth.enabled ? icons.bluetooth.enabled : icons.bluetooth.disabled;
        })
    });

export default () =>
    PanelButton({
        window: 'bluetooth',
        on_clicked: action.bind(),
        child: BluetoothIndicator()
    });
