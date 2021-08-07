import Color = require("color");
import {getConfig} from "../../backend/config";

export const BACKGROUND_COLOR = Color(getConfig().color.background);
export const FEATURE_BACKGROUND_COLOR = Color(getConfig().color.featureBackground);
export const FOREGROUND_COLOR = Color("#AAAAAA")

export const CPU_PRIMARY = Color(getConfig().cpu.ui.color.primary);

export const MEMORY_PRIMARY = Color(getConfig().memory.ui.color.memPrimary);
export const SWAP_PRIMARY = Color(getConfig().memory.ui.color.swapPrimary);
export const MEMORY_BASE_LINE_COLOR = Color(getConfig().memory.ui.color.graphBaseColor);
export const MEMORY_GUIDE_LINE_COLOR = Color(getConfig().memory.ui.color.graphGuideColor);
export const MEMORY_LABEL_COLOR = Color(getConfig().memory.ui.color.labelColor);

export const NETWORK_PRIMARY = Color(getConfig().network.color.primary);
export const NETWORK_BASE_LINE_COLOR = Color(getConfig().memory.ui.color.graphBaseColor);
export const NETWORK_GUIDE_LINE_COLOR = Color(getConfig().memory.ui.color.graphGuideColor);
export const NETWORK_LABEL_COLOR = Color(getConfig().memory.ui.color.labelColor);

export const DEFAULT_FONT_FAMILY = "Exo";
