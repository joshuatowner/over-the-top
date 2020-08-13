import {Config} from "./interface";

const DEFAULT_CONFIG: Config = {
    memory: {
        timing: {
            updateInterval: 1000,
        },
        ui: {
            color: {
                primary: "#9e69c2",
                graphBaseColor: "#FFFFFF",
                graphGuideColor: "#535353",
                labelColor: "#FFFFFF",
            },
            sizing: {
                barPadding: 4,
                numSegments: 31,
            }
        }
    },
    network: {
        interface: 'default',
        pingIp: '8.8.8.8',
        webUrl: 'google.com',
        timing: {
            bandwidthUpdateInterval: 1000,
            pingUpdateInterval: 3000,
            webUpdateInterval: 2000,
        },
        color: {
            primary: "#c29769",
            graphBaseColor: "#FFFFFF",
            graphGuideColor: "#535353",
            labelColor: "#FFFFFF",
        }
    },
    cpu: {
        timing: {
            updateInterval: 250,
        },
        ui: {
            sizing: {
                coresStart: 0.25,
                coresEnd: 0.7,
                historyStart: 0.8,
                historyEnd: 1.0,
                historyNumSegments: 100,
            },
            color: {
                primary: "#699CC2",
            }
        },
    },
    process: {
        memNumber: 30,
        cpuNumber: 30,
        timing: {
            updateInterval: 3000,
        }
    },
    color: {
        background: "#242424",
        featureBackground: "#333333",
    }
}

export default DEFAULT_CONFIG;
