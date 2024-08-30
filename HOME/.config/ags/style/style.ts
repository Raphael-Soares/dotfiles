/* eslint-disable max-len */
import { type Opt } from 'lib/option';
import options from 'options';
import { bash, dependencies } from 'lib/utils';

const deps = [
    'font',
    'theme',
    'bar.corners',
    'bar.flatButtons',
    'bar.position',
    'bar.battery.charging',
    'bar.battery.blocks'
];

const { colors, blur, padding, spacing, radius, shadows, widget, border } = options.theme;

const popoverPaddingMultiplier = 1.6;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const $ = (name: string, value: string | Opt<any>) => `$${name}: ${value};`;

const variables = () => [
    $('bg', blur.value ? `transparentize(${colors.bg}, ${blur.value / 100})` : colors.bg),
    $('fg', colors.fg),

    $('primary-bg', colors.primary.bg),
    $('primary-fg', colors.primary.fg),

    $('error-bg', colors.error.bg),
    $('error-fg', colors.error.fg),

    $('padding', `${padding}pt`),
    $('spacing', `${spacing}pt`),
    $('radius', `${radius}px`),
    $('transition', `${options.transition}ms`),

    $('shadows', `${shadows}`),

    $('widget-bg', `transparentize(${colors.widget}, ${widget.opacity.value / 100})`),

    $('hover-bg', `transparentize(${colors.widget}, ${(widget.opacity.value * 0.9) / 100})`),
    $('hover-fg', `lighten(${colors.fg}, 8%)`),

    $('border-width', `${border.width}px`),
    $('border-color', `transparentize(${colors.border}, ${border.opacity.value / 100})`),
    $('border', '$border-width solid $border-color'),

    $('active-gradient', `linear-gradient(to right, ${colors.primary.bg}, darken(${colors.primary.bg}, 4%))`),
    $('shadow-color', 'rgba(0,0,0,.6)'),
    $('text-shadow', '2pt 2pt 2pt $shadow-color'),
    $('box-shadow', '2pt 2pt 2pt 0 $shadow-color, inset 0 0 0 $border-width $border-color'),

    $('popover-border-color', `transparentize(${colors.border}, ${Math.max((border.opacity.value - 1) / 100, 0)})`),
    $('popover-padding', `$padding * ${popoverPaddingMultiplier}`),
    $('popover-radius', radius.value === 0 ? '0' : '$radius + $popover-padding'),

    $('font-size', `${options.font.size}pt`),
    $('font-name', options.font.name),

    // etc
    $('charging-bg', options.bar.battery.charging),
    $('bar-battery-blocks', options.bar.battery.blocks),
    $('bar-position', options.bar.position),
    $('hyprland-gaps-multiplier', options.hyprland.gaps),
    $('screen-corner-multiplier', `${options.bar.corners.value * 0.01}`)
];

async function resetCss() {
    if (!dependencies('sass', 'fd')) return;

    try {
        const vars = `${TMP}/variables.scss`;
        const scss = `${TMP}/main.scss`;
        const css = `${TMP}/main.css`;

        const fd = await bash(`fd ".scss" ${App.configDir}`);
        const files = fd.split(/\s+/);
        const imports = [vars, ...files].map((f) => `@import '${f}';`);

        await Utils.writeFile(variables().join('\n'), vars);
        await Utils.writeFile(imports.join('\n'), scss);
        await bash`sass ${scss} ${css}`;

        App.applyCss(css, true);
    } catch (error) {
        error instanceof Error ? logError(error) : console.error(error);
    }
}

Utils.monitorFile(`${App.configDir}/style`, resetCss);
options.handler(deps, resetCss);
await resetCss();
