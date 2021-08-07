import * as React from "react";
import {Backend} from "../data/backend";

export const BackendContext = React.createContext<Backend>(null as unknown as Backend);
