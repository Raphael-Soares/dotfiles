import { ButtonProps } from 'types/widgets/button';

type PanelButtonProps = ButtonProps & {};

export default ({ setup, ...rest }: PanelButtonProps) =>
    Widget.Button({
        child: Widget.Box({}),
        setup: (self) => {
            let open = false;
            self.toggleClassName('workspace-button');

            self.hook(App, (_, __, visible) => {
                if (open && !visible) {
                    open = false;
                    self.toggleClassName('active', false);
                }

                if (visible) {
                    open = true;
                    self.toggleClassName('active');
                }
            });

            if (setup) setup(self);
        },
        ...rest
    });
