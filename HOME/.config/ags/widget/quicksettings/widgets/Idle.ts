import { SimpleToggleButton } from '../ToggleButton';
import icons from 'lib/icons';
import HypridleService from 'service/idle'; // Ajuste o caminho conforme necessário

// Define o ícone com base no estado do hypridle
const icon = () => (HypridleService.isRunning ? icons.idle.active : icons.idle.inactive);

// Define o label com base no estado do hypridle
const label = () => (HypridleService.isRunning ? '' : '');

// Cria o widget de toggle usando SimpleToggleButton
export const HypridleToggle = () =>
    SimpleToggleButton({
        icon: Utils.watch(icon(), HypridleService, icon),
        label: Utils.watch(label(), HypridleService, label),
        toggle: () => (HypridleService.isRunning = !HypridleService.isRunning),

        connection: [HypridleService, () => !!HypridleService.isRunning]
    });
