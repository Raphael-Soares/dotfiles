import PanelButton from '../PanelButton';
import options from 'options';

const { action } = options.bar.wifi;
const network = await Service.import('network');

export const NetworkIndicator = () =>
    Widget.Icon().hook(network, (self) => {
        const icon = network[network.primary || 'wifi']?.icon_name;
        self.icon = icon || '';
        self.visible = !!icon;
    });

export default () =>
    PanelButton({
        window: 'wifi',
        on_clicked: action.bind(),
        child: NetworkIndicator()
    });
