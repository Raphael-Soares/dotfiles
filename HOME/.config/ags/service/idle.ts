import { bash, sh, dependencies } from 'lib/utils';

if (!dependencies('pgrep', 'pkill', 'notify-send')) App.quit();

const isHypridleRunning = async () => {
    try {
        const result = await bash`pgrep -x hypridle`;
        return result;
    } catch {
        return false;
    }
};

const toggleHypridle = async () => {
    if (await isHypridleRunning()) {
        await sh(`killall hypridle`);
    } else {
        await sh(`hypridle &`);
    }
};

class HypridleService extends Service {
    static {
        Service.register(
            this,
            {},
            {
                isRunning: ['boolean', 'rw']
            }
        );
    }

    #isRunning = false;

    get isRunning() {
        return this.#isRunning;
    }

    set isRunning(value) {
        if (value !== this.#isRunning) {
            toggleHypridle().then(() => {
                this.#isRunning = value;
                this.changed('isRunning');
            });
        }
    }

    constructor() {
        super();

        this.updateState();
        this.monitorProcess();
    }

    async updateState() {
        this.#isRunning = !!(await isHypridleRunning());
        this.changed('isRunning');
    }

    monitorProcess() {
        setInterval(async () => {
            const currentState = await isHypridleRunning();
            if (currentState !== this.#isRunning) {
                this.#isRunning = !!currentState;
                this.changed('isRunning');
            }
        }, 5000); // Verifica o estado a cada 5 segundos
    }
}

export default new HypridleService();
