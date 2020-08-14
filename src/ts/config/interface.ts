export interface Config {
    network: {
        interface: string,
        pingIp: string,
        webUrl: string,
        timing: {
            bandwidthUpdateInterval: number,
            pingUpdateInterval: number,
            webUpdateInterval: number,
        },
        color: {
            primary: string,
            graphBaseColor: string,
            graphGuideColor: string,
            labelColor: string,
        }
    },
    cpu: {
        timing: {
            updateInterval: number,
        },
        ui: {
            sizing: {
                coresStart: number,
                coresEnd: number,
                historyStart: number,
                historyEnd: number,
                historyNumSegments: number,
            },
            color: {
                primary: string,
            }
        }
    },
    memory: {
        timing: {
            updateInterval: number,
        },
        ui: {
            sizing: {
                barPadding: number,
                numSegments: number,
            },
            color: {
                memPrimary: string,
                swapPrimary: string,
                graphBaseColor: string,
                graphGuideColor: string,
                labelColor: string,
            }
        }
    },
    process: {
        memNumber: number,
        cpuNumber: number,
        timing: {
            updateInterval: number,
        }
    },
    color: {
        background: string,
        featureBackground: string,
    },
}
